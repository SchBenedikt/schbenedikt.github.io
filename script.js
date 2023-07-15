// Default username
const defaultUsername = "schBenedikt";

// Function to fetch GitHub project data using the API
async function getGitHubProjects(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await response.json();
  return data;
}

// Function to create project cards based on project data
function createProjectCards(projects) {
  const projectsContainer = document.querySelector(".projects");

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project");
    projectCard.onclick = () => openOverlay(project);

    const title = document.createElement("h2");
    title.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    const viewLink = document.createElement("a");
    viewLink.href = project.html_url;
    viewLink.textContent = "View Project";
    viewLink.target = "_blank"; // Open link in a new tab

    projectCard.appendChild(title);
    projectCard.appendChild(description);
    projectCard.appendChild(viewLink);

    projectsContainer.appendChild(projectCard);
  });
}

// Function to fetch the content of a project's README.html file
async function getReadmeContent(username, repoName) {
  const response = await fetch(`https://raw.githubusercontent.com/${username}/${repoName}/main/README.html`);
  const data = await response.text();
  return data;
}

// Function to open the overlay with the content of the README.html file
async function openOverlay(project) {
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayReadme = document.getElementById("overlay-readme");

  overlayTitle.textContent = project.name;

  try {
    // Fetch README.html content
    const readmeContent = await getReadmeContent(defaultUsername, project.name);

    // Insert the content into the overlay
    overlayReadme.innerHTML = readmeContent;

    overlay.classList.add("active");
  } catch (error) {
    console.error("Error fetching README.html content:", error);
  }
}

// Function to close the overlay
function closeOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("active");
}

// Example call to the functions
const username = defaultUsername;

getGitHubProjects(username)
  .then((projects) => {
    createProjectCards(projects);
  })
  .catch((error) => {
    console.error("Error fetching GitHub projects:", error);
  });
