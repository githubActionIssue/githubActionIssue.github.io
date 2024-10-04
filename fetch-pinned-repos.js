const fetch = require('node-fetch');
const fs = require('fs');
const GITHUB_TOKEN = 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;
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
