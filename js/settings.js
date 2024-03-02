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

function toggleUnsplash(checked) {
  document.cookie = `unsplash_enabled=${checked}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
}

function isUnsplashEnabled() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)unsplash_enabled\s*=\s*([^;]*).*$)|^.*$/, "$1");
  return cookieValue === "true";
}

function applyUnsplash() {
  const unsplashCheckbox = document.getElementById("unsplash");
  unsplashCheckbox.checked = isUnsplashEnabled();
}

applyBackgroundColor();
applyUnsplash();
applyStyle();
applyGlassStyle();
