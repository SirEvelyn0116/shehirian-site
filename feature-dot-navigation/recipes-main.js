fetch('../recipes/royal-soup.json')
  .then(res => res.json())
  .then(data => {
    document.querySelector('h1').textContent = data.title;
    // Populate ingredients and instructions dynamically...
  });