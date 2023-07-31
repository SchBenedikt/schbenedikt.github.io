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
   return data;
}
async function fetchUserEmail(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.ok) {
      const data = await response.json();
      return data.email;
    } else {
      console.error('Error fetching user data from GitHub API:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
async function updateContactButton(username) {
  const contactButton = document.querySelector('#contact-button');
  const userEmail = await fetchUserEmail(username);

  if (userEmail) {
    contactButton.href = `mailto:${userEmail}`;
  } else {
    contactButton.disabled = true;
    contactButton.textContent = 'E-Mail nicht verfügbar';
  }
}

// Function to create the project cards based on the project data
function createProjectCards(projects) {
   const projectsContainer = document.querySelector(".projects");
   projectsContainer.innerHTML = ""; // Clear existing project cards

   for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
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
  }
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

async function openOverlay(project) {
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayReadme = document.getElementById("overlay-readme");

  if (project === 'about') {
    overlayTitle.textContent = "About Me";
    const aboutDescription = document.getElementById("about-description");
    overlayReadme.innerHTML = aboutDescription.innerHTML;
  } else {
    overlayTitle.textContent = project.name;

    try {
      // Get README.md content
      const readmeContent = await getReadmeContent(username, project.name);

      // Open the new page with README content
      window.open(`project.html?project=${encodeURIComponent(project.name)}&content=${encodeURIComponent(readmeContent)}`, '_blank');
    } catch (error) {
      console.error("Error getting README.md content:", error);
      return;
    }
  }

  overlay.classList.add("inactive");
}

// Function to close the overlay
function closeOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("active");
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
          $("#github-api-status").html("🔴 GitHub API is not available");
        }
      }
    });
  }

  fetchData();
});
