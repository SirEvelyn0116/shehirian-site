document.addEventListener("DOMContentLoaded", function() {
  const themeSelect = document.getElementById('theme-select');
  const fontSelect = document.getElementById('font-select');

  function updateTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme', 'earth-theme');
    document.body.classList.add(`${theme}-theme`);
  }

  function updateFont(font) {
    document.body.classList.remove('serif-font', 'sans-serif-font', 'monospace-font');
    document.body.classList.add(`${font}-font`);
  }

  themeSelect.addEventListener('change', (e) => {
    updateTheme(e.target.value);
  });

  fontSelect.addEventListener('change', (e) => {
    updateFont(e.target.value);
  });

  // Set default theme and font
  updateTheme('light');
  updateFont('serif');
});
