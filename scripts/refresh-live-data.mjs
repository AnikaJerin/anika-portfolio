import { mkdir, readFile, writeFile } from "node:fs/promises";

const ghUser = "AnikaJerin";
const lcUser = "AnikaJerin";
const cfUser = "Anne29";
const hrUser = "anikajerin2";
const output = new URL("../public/live-data.json", import.meta.url);

async function getJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response.json();
}
async function safely(label, request, fallback) {
  try { return await request(); }
  catch (error) { console.warn(`${label} refresh skipped: ${error.message}`); return fallback; }
}

let previous = {};
try { previous = JSON.parse(await readFile(output, "utf8")); } catch {}

const github = await safely("GitHub", async () => {
  const data = await getJson(`https://api.github.com/users/${ghUser}`, { headers: { Accept: "application/vnd.github+json", "User-Agent": "anika-portfolio-refresh", ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) } });
  return { public_repos: data.public_repos, followers: data.followers, following: data.following, updated_at: data.updated_at };
}, previous.github);

const codeforces = await safely("Codeforces", async () => {
  const data = await getJson(`https://codeforces.com/api/user.info?handles=${cfUser}`);
  const profile = data.result?.[0];
  if (!profile) throw new Error("profile not found");
  
  let solved = 0;
  try {
    const statusData = await getJson(`https://codeforces.com/api/user.status?handle=${cfUser}&from=1&count=5000`);
    if (Array.isArray(statusData?.result)) {
      const accepted = new Set(statusData.result.filter(s => s.verdict === "OK").map(s => `${s.problem.contestId}-${s.problem.index}`));
      solved = accepted.size;
    }
  } catch (_) {}

  return { rating: profile.rating, rank: profile.rank, maxRating: profile.maxRating, maxRank: profile.maxRank, solved };
}, previous.codeforces);

const leetcode = await safely("LeetCode", async () => {
  let statsData = {};
  try {
    const data = await getJson(`https://leetcode-api-faisalshohag.vercel.app/${lcUser}`);
    if (data && (data.totalSolved !== undefined || data.easySolved !== undefined)) {
      statsData = {
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        ranking: data.ranking,
        submissionCalendar: data.submissionCalendar
      };
    }
  } catch (_) {}

  let badges = [{ displayName: "Data Structure I", icon: "https://assets.leetcode.com/static_assets/others/DS_I.png" }];
  let contestRating = 1480;
  let globalRanking = null;
  let attendedContests = 1;

  try {
    const gql = await getJson("https://leetcode.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com/" },
      body: JSON.stringify({
        query: `query getUserData($username: String!) {
          matchedUser(username: $username) {
            submitStatsGlobal { acSubmissionNum { difficulty count } }
            profile { ranking }
            badges { id displayName icon creationDate }
          }
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
          }
        }`,
        variables: { username: lcUser }
      })
    });

    const m = gql.data?.matchedUser;
    if (m?.badges?.length) badges = m.badges;
    const c = gql.data?.userContestRanking;
    if (c) {
      if (c.rating) contestRating = Math.round(c.rating);
      if (c.globalRanking) globalRanking = c.globalRanking;
      if (c.attendedContestsCount) attendedContests = c.attendedContestsCount;
    }
    if (m?.submitStatsGlobal?.acSubmissionNum && !statsData.totalSolved) {
      const rows = m.submitStatsGlobal.acSubmissionNum;
      const stats = Object.fromEntries(rows.map(({ difficulty, count }) => [difficulty, count]));
      statsData = {
        totalSolved: stats.All || 67,
        easySolved: stats.Easy || 45,
        mediumSolved: stats.Medium || 19,
        hardSolved: stats.Hard || 3,
        ranking: m.profile?.ranking || 2232254
      };
    }
  } catch (_) {}

  return {
    totalSolved: statsData.totalSolved || 67,
    easySolved: statsData.easySolved || 45,
    mediumSolved: statsData.mediumSolved || 19,
    hardSolved: statsData.hardSolved || 3,
    ranking: statsData.ranking || 2232254,
    contestRating: contestRating || 1480,
    globalRanking: globalRanking,
    attendedContests: attendedContests || 1,
    badges: badges,
    submissionCalendar: statsData.submissionCalendar
  };
}, previous.leetcode);

const hackerrank = await safely("HackerRank", async () => {
  let badges = [{ badge_name: "Problem Solving", stars: 3, points: 236, solved: 23 }];
  let solved = 23;
  let totalStars = 3;
  let totalPoints = 236;

  try {
    const data = await getJson(`https://www.hackerrank.com/rest/hackers/${hrUser}/badges`);
    if (Array.isArray(data?.models) && data.models.length > 0) {
      badges = data.models;
      solved = badges.reduce((acc, m) => acc + (m.solved || 0), 0) || 23;
      totalStars = badges.reduce((acc, m) => acc + (m.stars || 0), 0) || 3;
      totalPoints = badges.reduce((acc, m) => acc + (m.current_points || m.total_points || 0), 0) || 236;
    }
  } catch (_) {}

  const certifications = [
    { title: "Software Engineer", role: "Role Verified", kind: "CERTIFICATION", icon: null },
    { title: "Orchestrate", role: "Certified", kind: "CERTIFICATION", icon: null }
  ];

  const orchestrate = {
    edition: "Sep 2026",
    rank: "#924",
    percentile: "Top 31%",
    medal: null
  };

  return {
    solved,
    stars: totalStars,
    points: totalPoints,
    badges,
    certifications,
    orchestrate
  };
}, previous.hackerrank || {
  solved: 23,
  stars: 3,
  points: 236,
  badges: [{ badge_name: "Problem Solving", stars: 3, points: 236, solved: 23 }],
  certifications: [
    { title: "Software Engineer", role: "Role Verified", kind: "CERTIFICATION", icon: null },
    { title: "Orchestrate", role: "Certified", kind: "CERTIFICATION", icon: null }
  ],
  orchestrate: {
    edition: "Sep 2026",
    rank: "#924",
    percentile: "Top 31%",
    medal: null
  }
});

await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await writeFile(output, `${JSON.stringify({ updatedAt: new Date().toISOString(), github, codeforces, leetcode, hackerrank }, null, 2)}\n`);
console.log("Updated public/live-data.json");
