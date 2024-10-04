const fs = require('fs');
const mustache = require('mustache');
const { exec } = require('child_process');

// Read pinned repositories JSON file
const pinnedRepos = JSON.parse(fs.readFileSync('pinned-repos.json', 'utf-8'));

// Read the existing index.html
let indexHtml = fs.readFileSync('index.html', 'utf-8');

// Template for the new pinned projects (as a Mustache template)
const projectTemplate = `
  {{#repos}}
    <li>
      <a href="{{html_url}}" aria-label="{{name}} project">
        <h3>{{name}}</h3>
        <div class="description">
          {{description}}
        </div>
        <div class="link" aria-hidden="true">project</div>
      </a>
    </li>
  {{/repos}}
`;

// Render the new pinned projects using Mustache
const newPinnedProjects = mustache.render(projectTemplate, { repos: pinnedRepos });

// Define where to insert the new projects (before the closing </ul> tag)
const placeholderEnd = '</ul>';

// Insert the generated HTML for pinned projects before the closing </ul> tag
indexHtml = indexHtml.replace(placeholderEnd, `${newPinnedProjects}\n${placeholderEnd}`);

// Write the updated content back to index.html
fs.writeFileSync('index.html', indexHtml);

console.log('New pinned projects appended to index.html successfully!');




