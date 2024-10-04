(async () => {
  const fetch = (await import('node-fetch')).default;
  const fs = require('fs');

  // Use GitHub token from environment variables
  const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    throw new Error('MY_GITHUB_TOKEN is not defined');
  } 

const ORG_NAME = 'githubActionIssue'; 

async function getPinnedRepos() {
  const response = await fetch(`https://api.github.com/orgs/${ORG_NAME}/repos`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });

  const repos = await response.json();
  
  // Log the repos to see the response structure
  console.log(repos);  // Add this line for debugging

  // Check if repos is an array before filtering
  if (Array.isArray(repos)) {
    const pinnedRepos = repos.filter(repo => repo.pinned);
    fs.writeFileSync('pinned-repos.json', JSON.stringify(pinnedRepos, null, 2));
  } else {
    throw new Error('Unexpected response from GitHub API: expected an array of repositories');
  }
}

getPinnedRepos();
})();   


