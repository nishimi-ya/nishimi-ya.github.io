// Theme Toggle Function
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const themeToggleButton = document.querySelector('.theme-toggle');
  if (document.body.classList.contains("light-mode")) {
    themeToggleButton.textContent = "Dark Mode";
    themeToggleButton.classList.remove("light");
  } else {
    themeToggleButton.textContent = "Light Mode";
    themeToggleButton.classList.add("light");
  }
}
