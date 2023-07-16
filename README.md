# Neumorphism Website + Github API

This project showcases my GitHub repositories and allows you to explore the projects I've been working on. It uses the GitHub API to fetch the project data and displays it in a user-friendly format.

---

If you like my project, I would be happy about a star ⭐!

---

![image](https://github.com/SchBenedikt/schbenedikt.github.io/assets/137323528/3d4b79a6-3859-4af6-b63b-3b5890c9c2de)
![image](https://github.com/SchBenedikt/schbenedikt.github.io/assets/137323528/94c3e630-6d8b-4f80-bba5-069d457952c8)
![image](https://github.com/SchBenedikt/schbenedikt.github.io/assets/137323528/df05abab-f7b5-4aa8-a0b7-d6d9023a1cc1)
![image](https://github.com/SchBenedikt/schbenedikt.github.io/assets/137323528/1375b76a-9b28-4822-9ebb-b60bc445f20b)


---

## Introduction

Welcome to my GitHub Projects showcase! This project highlights the repositories I've been working on and provides a visually appealing and user-friendly interface to explore them. It utilizes the GitHub API to fetch the project data and incorporates various design effects to enhance the overall experience.

## Functionality

### Fetching GitHub Projects

The `getGitHubProjects(username)` function leverages the power of the GitHub API to fetch the project data associated with a given `username`. It retrieves the repositories and their details in a JSON format, allowing for easy integration and rendering.

### Creating Project Cards

The `createProjectCards(projects)` function dynamically generates project cards based on the fetched project data. Each card showcases key information, including the project name, a brief description, and a link to view the project on GitHub. The project cards are designed to be responsive and adapt to different screen sizes.

### Getting README.md Content

The `getReadmeContent(username, repoName)` function retrieves the contents of a project's README.md file from the GitHub API. By providing the `username` and `repoName` parameters, it fetches the raw Markdown content. The content is then processed and rendered in a formatted manner for a pleasant reading experience.

### Opening the Overlay

The `openOverlay(project)` function opens an overlay that displays the content of a project's README.md file. When a project card is clicked, this function is triggered, fetching and displaying the relevant README.md content. The overlay features a sleek and modern design, centered on the screen, allowing users to focus on the project details.

### Closing the Overlay

The `closeOverlay()` function enables users to easily close the overlay by clicking on the close button or outside the overlay area. It gracefully fades out the overlay, smoothly transitioning back to the main projects view.

### Automatically Filled About Me Description

The About Me section in the sidebar is automatically filled with the content from the README.md file of the repository that has the same name as the username. It provides a brief introduction and allows users to learn more about the project owner.

## Design Effects

This project incorporates several design effects to create an engaging and visually appealing experience:

- **Responsive Layout**: The layout of the project adapts to different screen sizes, ensuring optimal usability and readability across devices.

- **Sleek Overlay**: The overlay that displays the README.md content features a clean and elegant design. It is centered on the screen and adjusts its size to fit the content.

- **Smooth Transitions**: Opening and closing the overlay is accompanied by smooth transition effects, providing a seamless user experience.

- **Subtle Shadows**: Project cards and the overlay container have subtle box shadows applied, adding depth and dimension to the design.

- **Attention to Typography**: Careful attention has been given to typography, with appropriate font styles, sizes, and line heights used throughout the project.

- **Engaging Hover Effects**: Interactive hover effects have been applied to project cards, enhancing their visual appeal and providing a sense of interactivity.

## Usage

To use this project with your own GitHub repositories, follow these steps:

1. Update the `defaultUsername` variable with your GitHub username.
2. Customize the HTML structure, CSS styles, and design effects to match your preferences.
3. Incorporate your own branding and visual elements to create a unique showcase of your GitHub projects.
4. Deploy the project to a web server or host it locally.
5. Visit the webpage to explore and showcase your GitHub repositories in a visually appealing way.

Feel free to experiment with the CSS styles, add animations, or include additional design effects to make the project truly your own.

## Contributions and Feedback

If you have any suggestions, improvements, or feedback, please don't hesitate to contribute to this project. You can submit a pull request or open an issue on the GitHub repository. Your contributions and feedback are highly appreciated and help make this project better.

## License

This project is licensed under the MIT License. For more information, refer to the [LICENSE](link-to-license-file) file.


Thank you for exploring my GitHub Projects!
