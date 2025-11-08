// scroll-nav.js

const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute('id');
    }
  });

  dots.forEach(dot => {
    dot.classList.remove('active');
    if (dot.dataset.section === current) {
      dot.classList.add('active');
    }
  });
});
