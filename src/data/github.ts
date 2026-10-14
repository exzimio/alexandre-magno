import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const owner = 'exzimio';
const api = 'https://api.github.com';

// Resolved from the project root: in a build the module itself runs from a bundled chunk, so a path
// relative to it would point inside dist/.
const cachePath = join(process.cwd(), 'src', 'data', 'github-cache.json');

export interface GitHubSnapshot {
  fetchedAt: string;
  publicRepos: number;
  commits90d: number;
  lastCommit: { repo: string; date: string };
  repoLastCommit: Record<string, string>;
  docopsCi: { conclusion: string | null; url: string; date: string };
  docopsTests: number;
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${api}${path}`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'alexandre-magno-site' },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`GitHub ${response.status} for ${path}`);
  }

  return (await response.json()) as T;
}

interface Repo {
  name: string;
  fork: boolean;
  archived: boolean;
}

interface Commit {
  commit: { author: { date: string } };
}

interface Runs {
  workflow_runs: { conclusion: string | null; html_url: string; created_at: string }[];
}

async function countCommitsSince(repo: string, since: string): Promise<number> {
  let total = 0;

  for (let page = 1; ; page++) {
    const batch = await getJson<Commit[]>(`/repos/${owner}/${repo}/commits?since=${since}&per_page=100&page=${page}`);
    total += batch.length;

    if (batch.length < 100) {
      return total;
    }
  }
}

/**
 * The test count is the sum of the "Count" column of the README's test table. A row such as
 * "104 × 2" (each scenario run at two screen sizes) counts as 104: scenarios, not runs.
 */
export function countTests(readme: string): number {
  const section = readme.split(/^## Tests\s*$/m)[1]?.split(/^## /m)[0] ?? '';

  return section
    .split('\n')
    .filter((line) => line.startsWith('|') && !/^\|\s*-/.test(line))
    .map((line) => line.split('|').map((cell) => cell.trim())[3] ?? '')
    .map((cell) => Number.parseInt(cell, 10))
    .filter((value) => Number.isFinite(value))
    .reduce((sum, value) => sum + value, 0);
}

async function fetchSnapshot(): Promise<GitHubSnapshot> {
  const now = new Date();
  const since = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();

  const repos = (await getJson<Repo[]>(`/users/${owner}/repos?type=owner&per_page=100`)).filter(
    (repo) => !repo.fork && !repo.archived,
  );

  const repoLastCommit: Record<string, string> = {};
  let commits90d = 0;

  for (const repo of repos) {
    const [latest] = await getJson<Commit[]>(`/repos/${owner}/${repo.name}/commits?per_page=1`);

    if (latest) {
      repoLastCommit[repo.name] = latest.commit.author.date;
    }

    commits90d += await countCommitsSince(repo.name, since);
  }

  const [lastRepo, lastDate] = Object.entries(repoLastCommit).sort((a, b) => b[1].localeCompare(a[1]))[0] ?? ['', ''];

  const runs = await getJson<Runs>(`/repos/${owner}/DocOps/actions/runs?branch=main&status=completed&per_page=1`);
  const run = runs.workflow_runs[0];

  const readmeResponse = await fetch(`https://raw.githubusercontent.com/${owner}/DocOps/main/README.md`, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!readmeResponse.ok) {
    throw new Error(`README ${readmeResponse.status}`);
  }

  const docopsTests = countTests(await readmeResponse.text());

  if (!run || docopsTests === 0) {
    throw new Error('DocOps CI run or test table not found');
  }

  return {
    fetchedAt: now.toISOString(),
    publicRepos: repos.length,
    commits90d,
    lastCommit: { repo: lastRepo, date: lastDate },
    repoLastCommit,
    docopsCi: { conclusion: run.conclusion, url: run.html_url, date: run.created_at },
    docopsTests,
  };
}

async function readCache(): Promise<GitHubSnapshot | undefined> {
  try {
    return JSON.parse(await readFile(cachePath, 'utf-8')) as GitHubSnapshot;
  } catch {
    return undefined;
  }
}

function sameNumbers(a: GitHubSnapshot, b: GitHubSnapshot): boolean {
  return JSON.stringify({ ...a, fetchedAt: '' }) === JSON.stringify({ ...b, fetchedAt: '' });
}

let pending: Promise<GitHubSnapshot> | undefined;

/**
 * Read once per build and shared by every page. When GitHub cannot be reached, or the anonymous rate
 * limit is spent, the last snapshot written to github-cache.json is used instead, and its date is what
 * the page shows.
 */
export function loadGitHub(): Promise<GitHubSnapshot> {
  pending ??= fetchSnapshot()
    .then(async (snapshot) => {
      // Rewritten only when a number changed, so a build does not dirty the repository just
      // because the time of the reading moved.
      const cached = await readCache();

      if (!cached || !sameNumbers(cached, snapshot)) {
        await writeFile(cachePath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf-8');
      }

      return snapshot;
    })
    .catch(async (error: unknown) => {
      console.warn(`[github] using the cached snapshot: ${error instanceof Error ? error.message : String(error)}`);
      return JSON.parse(await readFile(cachePath, 'utf-8')) as GitHubSnapshot;
    });

  return pending;
}

export const day = (iso: string) => iso.slice(0, 10);
