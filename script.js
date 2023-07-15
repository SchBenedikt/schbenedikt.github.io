// Default username
const defaultUsername = "schBenedikt";

// Function to get the GitHub project data via API
async function getGitHubProjects(username) {
   const response = await fetch(`https://api.github.com/users/${username}/repos`);
   const data = await response.json();
   return data;
}

// Function to create the project maps based on the project data
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

// Function to open the overlay with the contents of the README.md file
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
       const readmeContent = await getReadmeContent(defaultUsername, project.name);

       // Paste the content into the overlay
       const converter = new showdown.Converter();
       const htmlContent = converter.makeHtml(readmeContent);
       overlayReadme.innerHTML = htmlContent;
     } catch (error) {
       console.error("Error getting README.md content:", error);
       return;
     }
   }

   overlay.classList.add("active");
}

// Function to close the overlay
function closeOverlay() {
   const overlay = document.getElementById("overlay");
   overlay.classList.remove("active");
}

// example call of the functions
const username = defaultUsername;

getGitHubProjects(username)
   .then((projects) => {
     createProjectCards(projects);
   })
   .catch((error) => {
     console.error("Error getting GitHub projects:", error);
   });

// Load README.md file for "About Me".
getReadmeContent(defaultUsername, defaultUsername)
   .then((readmeContent) => {
     const aboutDescription = document.getElementById("about-description");
     const converter = new showdown.Converter();
     const htmlContent = converter.makeHtml(readmeContent);
     aboutDescription.innerHTML = htmlContent;
   })
   .catch((error) => {
     console.error("Error loading README.md file:", error);
   });
