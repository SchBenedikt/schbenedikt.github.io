
    function saveBackgroundColor(color) {
      document.cookie = `background_color=${encodeURIComponent(color)}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    }

    function getBackgroundColor() {
      const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)background_color\s*=\s*([^;]*).*$)|^.*$/, "$1");
      return decodeURIComponent(cookieValue) || "#ededed";
    }

    function applyBackgroundColor() {
      const body = document.body;
      const backgroundColor = getBackgroundColor();
      body.style.backgroundColor = backgroundColor;
    }

    function saveButtonColor(color) {
      document.cookie = `button_color=${encodeURIComponent(color)}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    }

    function getButtonColor() {
      const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)button_color\s*=\s*([^;]*).*$)|^.*$/, "$1");
      return decodeURIComponent(cookieValue) || "#fff";
    }

    function applyButtonColor() {
      const buttons = document.querySelectorAll(".button");
      const buttonColor = getButtonColor();
      buttons.forEach(button => {
        button.style.backgroundColor = buttonColor;
        button.style.color = "#333";
      });
    }

    function saveProjectColor(color) {
      document.cookie = `project_color=${encodeURIComponent(color)}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    }

    function getProjectColor() {
      const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)project_color\s*=\s*([^;]*).*$)|^.*$/, "$1");
      return decodeURIComponent(cookieValue) || "#f8f8f8";
    }

    function applyProjectColor() {
      const projects = document.querySelectorAll(".project");
      const projectColor = getProjectColor();
      projects.forEach(project => {
        project.style.backgroundColor = projectColor;
      });
    }

    applyBackgroundColor();
    applyButtonColor();
    applyProjectColor();
