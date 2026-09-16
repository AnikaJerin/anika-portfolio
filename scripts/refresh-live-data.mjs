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
  try {
    const data = await getJson(`https://leetcode-api-faisalshohag.vercel.app/${lcUser}`);
    if (data && (data.totalSolved !== undefined || data.easySolved !== undefined)) {
      return {
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        ranking: data.ranking,
        badges: (data.badges || []).map(({ displayName, icon }) => ({ displayName, icon })),
        submissionCalendar: data.submissionCalendar
      };
    }
  } catch (_) {}

  const data = await getJson("https://leetcode.com/graphql/", { method: "POST", headers: { "Content-Type": "application/json", Referer: "https://leetcode.com/" }, body: JSON.stringify({ query: "query userProblemsSolved($username: String!) { matchedUser(username: $username) { submitStatsGlobal { acSubmissionNum { difficulty count } } profile { ranking } badges { id displayName icon creationDate } } }", variables: { username: lcUser } }) });
  const rows = data.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  if (!rows) throw new Error("profile not found");
  const stats = Object.fromEntries(rows.map(({ difficulty, count }) => [difficulty, count]));
  const profile = data.data.matchedUser;
  return { totalSolved: stats.All || 0, easySolved: stats.Easy || 0, mediumSolved: stats.Medium || 0, hardSolved: stats.Hard || 0, ranking: profile.profile?.ranking, badges: (profile.badges || []).map(({ displayName, icon }) => ({ displayName, icon })) };
}, previous.leetcode);

const hackerrank = await safely("HackerRank", async () => {
  const data = await getJson(`https://www.hackerrank.com/rest/hackers/${hrUser}/badges`);
  const models = data?.models || [];
  const solved = models.reduce((acc, m) => acc + (m.solved || 0), 0);
  const totalStars = models.reduce((acc, m) => acc + (m.stars || 0), 0);
  const totalPoints = models.reduce((acc, m) => acc + (m.current_points || m.total_points || 0), 0);
  return { solved: solved || 23, stars: totalStars || 3, points: totalPoints || 236, badges: models };
}, previous.hackerrank || { solved: 23, stars: 3, points: 236 });

await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await writeFile(output, `${JSON.stringify({ updatedAt: new Date().toISOString(), github, codeforces, leetcode, hackerrank }, null, 2)}\n`);
console.log("Updated public/live-data.json");
