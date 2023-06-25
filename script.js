function openOverlay(contentType) {
  var overlay = document.getElementById("overlay");
  var overlayContent = document.getElementById("overlay-content");
  var overlayTitle = document.getElementById("overlay-title");
  var overlayDescription = document.getElementById("overlay-description");

  if (contentType === "about") {
    overlayTitle.textContent = "About Me";
    overlayDescription.textContent = "I'm a passionate developer with a love for coding and creating innovative solutions. I enjoy working on various projects and exploring new technologies.";
  } else if (contentType === "project1") {
    overlayTitle.textContent = "Project 1";
    overlayDescription.textContent = "This is the description of Project 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  } else if (contentType === "project2") {
    overlayTitle.textContent = "Project 2";
    overlayDescription.textContent = "This is the description of Project 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  } else if (contentType === "project3") {
    overlayTitle.textContent = "Project 3";
    overlayDescription.textContent = "This is the description of Project 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  }

  overlay.classList.add("active");
}

function closeOverlay() {
  var overlay = document.getElementById("overlay");
  overlay.classList.remove("active");
}
