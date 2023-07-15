# Neumorphism Website + Github API

This project showcases my GitHub repositories and allows you to explore the projects I've been working on. It uses the GitHub API to fetch the project data and displays it in a user-friendly format.

## Functionality

### Fetching GitHub Projects

The `getGitHubProjects(username)` function fetches the project data from the GitHub API. It takes a `username` parameter and retrieves the repositories associated with that username. It returns the data as a JSON object.

### Creating Project Cards

The `createProjectCards(projects)` function creates project cards based on the project data retrieved from the API. It takes an array of `projects` as input and dynamically generates project cards for each project. Each card displays the project name, description, and a "View Project" link that opens the project's GitHub page in a new tab.

### Getting README.md Content

The `getReadmeContent(username, repoName)` function fetches the content of a project's README.md file from the GitHub API. It takes the `username` and `repoName` as parameters and retrieves the README.md content. The content is returned as a string after Base64 decoding.

### Opening the Overlay

The `openOverlay(project)` function opens an overlay that displays the content of a project's README.md file. It takes a `project` object as input, which contains information about the project. When the function is called, it fetches the README.md content using the `getReadmeContent` function and inserts it into the overlay. The overlay becomes visible to the user.

### Closing the Overlay

The `closeOverlay()` function closes the overlay. When called, it removes the active class from the overlay element, making it hidden from the user.

## Usage

To use this project on your own GitHub repositories, follow these steps:

1. Update the `defaultUsername` (`script.js`) variable with your GitHub username.
2. Customize the HTML structure and styling to fit your needs.
3. Include the necessary CSS and JavaScript files.
4. Add the Font Awesome CSS file link in the HTML if you want to use icons.
5. Deploy the project to a web server or host it locally.
6. Visit the webpage to see your GitHub projects displayed.

Please note that you need to have a valid GitHub account and repositories associated with it for this project to work properly.

## Contributing

If you have any suggestions, improvements, or bug fixes, feel free to submit a pull request or open an issue on the GitHub repository. Contributions are always welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](link-to-license-file) file for more details.

## Acknowledgments

I would like to acknowledge the GitHub API for providing the necessary data to build this project. Additionally, thanks to the Font Awesome library for the icons used in this project.



Thank you for checking out my GitHub projects!
