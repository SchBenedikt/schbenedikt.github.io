const urlParams = new URLSearchParams(window.location.search);
const projectTitle = decodeURIComponent(urlParams.get('project'));
const projectContent = decodeURIComponent(urlParams.get('content'));

const projectTitleElement = document.getElementById("project-title");
const projectReadmeElement = document.getElementById("project-readme");
projectTitleElement.textContent = projectTitle;

// Function to render the GitHub flavored Markdown as HTML
async function renderReadme(markdownContent) {
    try {
    const response = await fetch('https://api.github.com/markdown', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        text: markdownContent,
        mode: 'gfm',
        context: 'github/gollum'
        })
    });

    if (response.ok) {
        const htmlContent = await response.text();
        projectReadmeElement.innerHTML = htmlContent;
    } else {
        console.error('Error fetching GitHub API:', response.status);
    }
    } catch (error) {
    console.error('Error rendering README:', error);
    }
}

// Call the function to render the README content as formatted HTML
renderReadme(projectContent);
