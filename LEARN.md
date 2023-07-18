# My amazing Neumorphism HTML & CSS project
This project shows my amazing Neumorphism HTML & CSS website hosted with GitHub API. It shows my GitHub repositories and allows you to explore the projects I've been working on. It uses the GitHub API to fetch the project data and displays it in a user-friendly format. If you like my project, I would be happy about a star ⭐!

Main Features and Benefits
Retrieving GitHub projects: The getGitHubProjects(username) function leverages the power of the GitHub API to retrieve the project data related to a specific username. It fetches the repositories and their details in JSON format, allowing for easy integration and presentation.
Creating Project Cards: The createProjectCards(projects) function dynamically creates project cards based on the retrieved project data. Each card displays important information such as the project name, a brief description, and a link to view the project on GitHub. The project maps are designed to be responsive and adapt to different screen sizes.
Retrieving README.md content: The getReadmeContent(username, repoName) function retrieves the contents of a project's README.md file from the GitHub API. By specifying the username and repoName parameters, it fetches the raw Markdown content. The content is then processed and presented in a formatted format for an enjoyable reading experience.
Opening the overlay: The openOverlay(project) function opens an overlay showing the contents of a project's README.md file. When a project card is clicked, this function is triggered, which retrieves and displays the relevant README.md content. The overlay features a sleek and modern design that is centered on the screen, allowing users to focus on the project details.
Closing the overlay: The closeOverlay() function allows the users to close the overlay easily by clicking the close button or outside the overlay area. It gently fades out the overlay and smoothly switches back to the main project view.
Auto-populated About Me Description: The About Me section in the sidebar is auto-populated with the content from the README.md file of the repository that has the same name as the username. It provides a brief introduction and allows users to learn more about the project owner.
Technologies and languages used
This project was created with the following technologies and languages:
- HTML
- CSS
- JavaScript
- GitHub API
## Requirements and instructions for running or installing the project
To run or install this project you will need the following:

- A web browser (e.g. Chrome, Firefox or Edge)
- A text editor (e.g. VS Code or Notepad++)
- A GitHub account

The steps to run or install the project are:

- Clone or download this repository to your local computer.
- Open the index.html file in your web browser.
- Enjoy the website and explore the projects.
## Ways other students can contribute to this project
If you want to contribute to this project, you can do the following:

- Create an issue or pull request on this repository with your feedback or suggestion.
- Share this project with other students or friends who might be interested.


Give this project a star ⭐ or follow me on GitHub.
