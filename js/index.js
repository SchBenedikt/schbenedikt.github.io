   // Default username
let username = "schBenedikt";
const home = document.getElementById("home");
home.href = `https://www.github.com/${username}`;


// Function to get the GitHub user data via API
async function getGitHubUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
}

// Function to get the GitHub project data via API
async function getGitHubProjects(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await response.json();
  return data.slice(0, 15);
}

// Function to create the project cards based on the project data
function createProjectCards(projects) {
  const projectsContainer = document.querySelector(".projects");
  projectsContainer.innerHTML = ""; // Clear existing project cards

  const maxProjectsToShow = 5; // Maximum number of projects to show initially
  const showAllButton = document.createElement("button");
  showAllButton.textContent = "Show All Projects";
  showAllButton.onclick = () => {
    showAllButton.style.display = "none"; // Hide the button after clicking
    projects.forEach(project => {
      const projectCard = createProjectCard(project);
      projectsContainer.appendChild(projectCard);
    });
    const collapseButton = document.createElement("button");
    collapseButton.textContent = "Collapse";
    collapseButton.onclick = () => {
      projectsContainer.innerHTML = ""; // Clear project cards
      projects.slice(0, maxProjectsToShow).forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
      });
      projectsContainer.appendChild(showAllButton); // Show the "Show All Projects" button
    };
    projectsContainer.appendChild(collapseButton); // Show the "Collapse" button
  };

  for (let i = 0; i < Math.min(projects.length, maxProjectsToShow); i++) {
    const project = projects[i];
    const projectCard = createProjectCard(project);
    projectsContainer.appendChild(projectCard);
  }

  if (projects.length > maxProjectsToShow) {
    projectsContainer.appendChild(showAllButton);
  }
}

function createProjectCard(project) {
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

  return projectCard;
}

// Function to get the contents of a project's README.md file
async function getReadmeContent(username, repoName) {
   const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/readme`);
   const data = await response.json();

   if (data.download_url) {
     const readmeResponse = await fetch(data.download_url);
     const readmeContent = await readmeResponse.text();
     return readmeContent;
   } else {
     throw new Error("README.md file not found.");
   }
}

async function getRepositoryDetails(username, projectName) {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${projectName}`);
    const data = await response.json();
    data.username = username; // Füge den Username zum Datenobjekt hinzu
    return data;
  } catch (error) {
    console.error("Error fetching repository details:", error);
    return null;
  }
}

async function openOverlay(project) {
  const overlay = document.getElementById("overlay");
  const overlayReadme = document.getElementById("overlay-readme");

  if (project === 'about') {
    const aboutDescription = document.getElementById("about-description");
    overlayReadme.innerHTML = aboutDescription.innerHTML;
  } else {

    try {
      // Get README.md content
      const readmeContent = await getReadmeContent(username, project.name);

      // Get repository details (including the number of stars, forks, watchers, and contributors)
      const repositoryDetails = await getRepositoryDetails(username, project.name);

      // Get the topics for the project
      const topicsResponse = await fetch(`https://api.github.com/repos/${username}/${project.name}/topics`, {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json" // Include the 'topics' preview header
        }
      });
      const topicsData = await topicsResponse.json();
      const topics = topicsData.names.join(", ");

      // Open the new page with README content, number of stars, forks, watchers, topics, and project description
      window.open(`project.html?username=${encodeURIComponent(username)}&project=${encodeURIComponent(project.name)}&content=${encodeURIComponent(readmeContent)}&stars=${encodeURIComponent(repositoryDetails.stargazers_count)}&forks=${encodeURIComponent(repositoryDetails.forks_count)}&watchers=${encodeURIComponent(repositoryDetails.watchers_count)}&topics=${encodeURIComponent(topics)}&description=${encodeURIComponent(project.description)}`, '_blank');
    } catch (error) {
      console.error("Error getting README.md content, repository details, or topics:", error);
      return;
    }
  }

  overlay.classList.add("inactive");
}

// Function to update the username and reload data
function updateUsername() {
  const usernameInput = document.getElementById("username-input");
  const newUsername = usernameInput.value.trim();
  home.href = `https://www.github.com/${newUsername}`;
  if (newUsername === "") {
    alert("Please enter a valid username.");
    return;
  }

  username = newUsername;
  usernameInput.value = ""; // Clear the input field

  // Reload data
  Promise.all([
    getGitHubUser(username),
    getGitHubProjects(username),
    getReadmeContent(username, username)
  ])
    .then(([user, projects, aboutContent]) => {
      createProjectCards(projects);
      const aboutDescription = document.getElementById("about-description");
      const converter = new showdown.Converter();
      const htmlContent = converter.makeHtml(aboutContent);
      aboutDescription.innerHTML = htmlContent;

      // Update the user profile picture
      const profileImg = document.getElementById("profile-picture");
      profileImg.src = user.avatar_url;
      profileImg.alt = `${username}'s Profile Picture`;
    })
    .catch((error) => {
      console.error("Error updating username:", error);
    });
}

// Get the projects container
const projectsContainer = document.querySelector(".projects");

// Filter the projects based on the search input
function filterProjects() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const projectCards = projectsContainer.getElementsByClassName("project");

  for (const projectCard of projectCards) {
    const title = projectCard.querySelector("h2").textContent.toLowerCase();
    const description = projectCard.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchInput) || description.includes(searchInput)) {
      projectCard.style.display = "block";
    } else {
      projectCard.style.display = "none";
    }
  }
}

// Load initial data
Promise.all([
  getGitHubUser(username),
  getGitHubProjects(username),
  getReadmeContent(username, username)
])
  .then(([user, projects, aboutContent]) => {
    createProjectCards(projects);
    const aboutDescription = document.getElementById("about-description");
    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(aboutContent);
    aboutDescription.innerHTML = htmlContent;

    // Set the user profile picture
    const profileImg = document.getElementById("profile-picture");
    profileImg.src = user.avatar_url;
    profileImg.alt = `${username}'s Profile Picture`;
  })
  .catch((error) => {
    console.error("Error loading initial data:", error);
  }); 
  
  // Function to handle keydown event on the username input field
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      updateUsername();
    }
  }

$(document).ready(function(){
  var retryCount = 0;
  var maxRetries = 3;

  function fetchData() {
    $.ajax({
      url: "https://api.github.com/",
      type: "GET",
      success: function(){
        $(".container").addClass("success");
        $("#github-api-status").html("🟢 GitHub API is working");
      },
      error: function(){
        if (retryCount < maxRetries) {
          retryCount++;
          $("#github-api-status").html("🔵 Connection error. Retrying... (" + retryCount + "/" + maxRetries + ")");
          setTimeout(fetchData, 3000); // Retry after 3 seconds
        } else {
          $(".container").addClass("error");
          $("#github-api-status").html("🔴 GitHub API is not available. <br> <br>Please wait some minutes.");
        }
      }
    });
  }

  fetchData();
}); 
