const urlParams = new URLSearchParams(window.location.search);
const projectTitle = decodeURIComponent(urlParams.get("project"));
const projectContent = decodeURIComponent(urlParams.get("content"));
const projectStars = urlParams.get("stars");
const projectForks = urlParams.get("forks");
const projectWatchers = urlParams.get("watchers");
const projectTopics = decodeURIComponent(urlParams.get("topics")); // Get the topics from URL
const projectDescription = decodeURIComponent(
urlParams.get("description")
); // Get the project description from URL
const username = urlParams.get("username");

const projectTitleElement = document.getElementById("project-title");
const projectReadmeElement = document.getElementById("project-readme");
const projectStarsElement = document.getElementById("project-stars");
const projectForksElement = document.getElementById("project-forks");
const projectWatchersElement =
document.getElementById("project-watchers");
const projectTopicsElement = document.getElementById("project-topics"); // New element to display topics
const projectDescriptionElement = document.getElementById(
"project-description"
); // New element to display project description

projectTitleElement.textContent = projectTitle;

// Function to render the GitHub flavored Markdown as HTML
async function renderReadme(markdownContent) {
try {
    const response = await fetch("https://api.github.com/markdown", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        text: markdownContent,
        mode: "gfm",
        context: "github/gollum",
    }),
    });

    if (response.ok) {
    const htmlContent = await response.text();
    projectReadmeElement.innerHTML = htmlContent;
    } else {
    console.error("Error fetching GitHub API:", response.status);
    }
} catch (error) {
    console.error("Error rendering README:", error);
}
}

// Function to display the number of stars
function displayStars(stars) {
    const starsText = `<span class="bold-text">Stars:</span> ${stars}`;
    projectStarsElement.innerHTML = starsText;
    projectStarsElement.href = `https://github.com/${username}/${projectTitle}/stargazers`;
}

// Function to display the number of forks
function displayForks(forks) {
    const forksText = `<span class="bold-text">Forks:</span> ${forks}`;
    projectForksElement.innerHTML = forksText;
    projectForksElement.href = `https://github.com/${username}/${projectTitle}/forks`;
}

// Function to display the number of watchers
function displayWatchers(watchers) {
    const watchersText = `<span class="bold-text">Watchers:</span> ${watchers}`;
    projectWatchersElement.innerHTML = watchersText;
    projectWatchersElement.href = `https://github.com/${username}/${projectTitle}/watchers`;
}

// Function to display the project description
function displayDescription(description) {
    const descriptionText = `<span class="bold-text">Description:</span> <br><br>${
        description !== "null" ? description : "No description provided."
    }`;
    projectDescriptionElement.innerHTML = descriptionText;
}

// Function to display the topics and their links as buttons
function displayTopics(topics) {
    if (!topics) {
        projectTopicsElement.style.display = "none";
        return;
    }

    const topicsList = topics.split(","); // Assuming topics are comma-separated
    const topicsHTML = topicsList.map(
        (topic) =>
        `<button class="button" onclick="openTopicLink('${topic}')" style="margin-right: 5px;">${topic}</button>`
    );
    const topicsText = `<span class="bold-text">Topics:</span><br><br> ${topicsHTML.join(
        " "
    )}`;
    projectTopicsElement.innerHTML = topicsText;
}
function displayOwner(username) {
    const ownerText = `<span class="bold-text"></span> ${username}`; //Text to display words before the name of the owner.
    const projectOwnerElement = document.getElementById("project-owner");
    projectOwnerElement.innerHTML = ownerText;
}

// Call the function to render the README content as formatted HTML
renderReadme(projectContent);

// Call the function to display the number of stars
displayStars(projectStars);

// Call the function to display the number of forks
displayForks(projectForks);

// Call the function to display the number of watchers
displayWatchers(projectWatchers);

// Call the function to display the project description
displayDescription(projectDescription);

// Call the function to display the owner of the project
displayOwner(username);

// Call the function to display the topics and their links as buttons
displayTopics(projectTopics);

// Function to open topic link in a new tab
function openTopicLink(topic) {
    const topicURL = `https://github.com/topics/${topic}`;
    window.open(topicURL, "_blank");
}
