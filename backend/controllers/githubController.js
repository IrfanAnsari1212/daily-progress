import axios from "axios";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const githubSummary = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  const [profile, repos, events] = await Promise.all([
    axios.get(`https://api.github.com/users/${username}`, { headers }),
    axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
    axios.get(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers })
  ]);
  const weeklyCommits = events.data
    .filter((event) => event.type === "PushEvent" && Date.now() - new Date(event.created_at).getTime() < 7 * 86400000)
    .reduce((count, event) => count + (event.payload.commits?.length || 0), 0);
  await User.findByIdAndUpdate(req.user._id, { githubUsername: username });
  res.json({
    profile: { login: profile.data.login, avatarUrl: profile.data.avatar_url, bio: profile.data.bio, followers: profile.data.followers },
    totalRepositories: profile.data.public_repos,
    weeklyCommits,
    repositories: repos.data.slice(0, 6).map((repo) => ({ id: repo.id, name: repo.name, url: repo.html_url, stars: repo.stargazers_count, language: repo.language }))
  });
});
