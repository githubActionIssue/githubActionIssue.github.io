(async () => {
  const fetch = (await import('node-fetch')).default;
  const fs = require('fs');
  // Use GitHub token from environment variables
const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not defined');
  }

const ORG_NAME = 'githubActionIssue'; 

async function getPinnedRepos() {
  const response = await fetch(`https://api.github.com/orgs/${ORG_NAME}/repos`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });

  const repos = await response.json();
  const pinnedRepos = repos.filter(repo => repo.pinned);

  // Write the data to a JSON file to be used later
  fs.writeFileSync('pinned-repos.json', JSON.stringify(pinnedRepos, null, 2));
}

getPinnedRepos();
})();   