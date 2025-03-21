document.addEventListener('DOMContentLoaded', () => {
    // Typing effect functionality
    const dynamicText = document.querySelector('.dynamic-text');
    const words = ['Support Specialist in IT', 'web designer', 'Machine Learning Beginner', 'Cybersecurity Enthusiast', 'Frontend Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function typeEffect() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }
      dynamicText.textContent = currentWord.substring(0, charIndex);
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, 100);
      }
    }
    typeEffect();
  
    // Back-to-top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // Theme toggle functionality with localStorage support
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeToggleBtn.textContent = 'Switch to Dark Mode';
    }
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = 'Switch to Dark Mode';
      } else {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = 'Switch to Light Mode';
      }
    });
  });
  