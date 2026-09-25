import { mkdir, readFile, writeFile } from "node:fs/promises";

const ghUser = "AnikaJerin";
const lcUser = "AnikaJerin";
const hrUser = "anikajerin2";
const deepMlProfile = "https://www.deep-ml.com/profile/gGq3xAXd2OeX3OUPUPNxSBUdvDh1";
const tensorTonicUser = "anikajerin2";
const output = new URL("../public/live-data.json", import.meta.url);

async function getJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response.json();
}
async function getText(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response.text();
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
  let contestRating = 1490;
  let globalRanking = null;
  let attendedContests = 2;

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
    contestRating: contestRating || 1490,
    globalRanking: globalRanking,
    attendedContests: attendedContests || 2,
    badges: badges,
    submissionCalendar: statsData.submissionCalendar
  };
}, previous.leetcode);

const deepml = await safely("Deep-ML", async () => {
  const html = await getText(deepMlProfile, { headers: { "User-Agent": "anika-portfolio-refresh" } });
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] || "";
  const match = description.match(/(\d+)\s+problems solved\s*\(Easy\s+(\d+)%\s*·\s*Medium\s+(\d+)%\s*·\s*Hard\s+(\d+)%\)\s*·\s*🔥\s*(\d+)\s+Flame Score\s*·\s*(\d+)\s+day streak/i);
  if (!match) throw new Error("public profile statistics were not found");
  const [, solved, easyPercent, mediumPercent, hardPercent, flameScore, streak] = match;
  return { solved: Number(solved), easyPercent: Number(easyPercent), mediumPercent: Number(mediumPercent), hardPercent: Number(hardPercent), flameScore: Number(flameScore), streak: Number(streak) };
}, previous.deepml);

const tensortonic = await safely("TensorTonic", async () => {
  const data = await getJson(`https://api.tensortonic.com/api/public/profile/${tensorTonicUser}`);
  const profile = data?.data;
  if (!profile?.username) throw new Error("public profile not found");
  const userId = profile.id;
  const statKinds = ["free", "research", "study-plan", "system-design", "assessment"];
  const badgeKinds = ["categories", "milestones", "research", "study-plans"];
  const [statResponses, badgeResponses] = await Promise.all([
    Promise.all(statKinds.map(kind => getJson(`https://api.tensortonic.com/api/user/${userId}/stats/${kind}`))),
    Promise.all(badgeKinds.map(kind => getJson(`https://api.tensortonic.com/api/user/${userId}/badges/${kind}`)))
  ]);
  const totals = statResponses.map(response => response?.data || {}).reduce((all, stats) => ({
    solved: all.solved + (stats.total || 0),
    easy: all.easy + (stats.easy || 0), medium: all.medium + (stats.medium || 0), hard: all.hard + (stats.hard || 0),
    totalEasy: all.totalEasy + (stats.totalEasy || 0), totalMedium: all.totalMedium + (stats.totalMedium || 0), totalHard: all.totalHard + (stats.totalHard || 0)
  }), { solved: 0, easy: 0, medium: 0, hard: 0, totalEasy: 0, totalMedium: 0, totalHard: 0 });
  const badges = badgeResponses.flatMap(response => Array.isArray(response?.data) ? response.data : []);
  return { username: profile.username, name: profile.name || profile.username, rank: profile.rank ?? null, plan: profile.plan || null, ...totals, badgesEarned: badges.filter(badge => badge.earned).length, badgesTotal: badges.length };
}, previous.tensortonic);

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
await writeFile(output, `${JSON.stringify({ updatedAt: new Date().toISOString(), github, leetcode, deepml, tensortonic, hackerrank }, null, 2)}\n`);
console.log("Updated public/live-data.json");
