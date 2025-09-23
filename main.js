document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded successfully!');

  // ===== Loading Screen =====
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 2000); // Show loading for 2 seconds
    }
  }

  // Hide loading screen when everything is loaded
  hideLoadingScreen();

  // ===== ReactBits-Inspired Animations =====
  
  // Particle System
  function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      container.appendChild(particle);
    }
  }

  // Typewriter Effect
  function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (!typewriterElement) return;

    const texts = JSON.parse(typewriterElement.getAttribute('data-texts'));
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentText = texts[currentTextIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
      } else {
        typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentCharIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before typing
      }

      setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();
  }

  // Scroll-triggered animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Observe skill logos
    document.querySelectorAll('.skill-logo').forEach(logo => {
      observer.observe(logo);
    });

    // Observe project cards
    document.querySelectorAll('.proj-card').forEach(card => {
      observer.observe(card);
    });
  }

  // Enhanced skill animations
  function initSkillAnimations() {
    document.querySelectorAll('.skill-logo').forEach((logo, index) => {
      logo.style.animationDelay = `${index * 0.1}s`;
      
      logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'translateY(-10px) scale(1.1)';
        logo.style.boxShadow = '0 20px 40px rgba(255, 0, 51, 0.4)';
      });

      logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'translateY(0) scale(1)';
        logo.style.boxShadow = 'none';
      });
    });
  }

  // 3D Card Effects
  function init3DCardEffects() {
    document.querySelectorAll('.proj-card, .exp-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // About section card animations
  function initAboutAnimations() {
    const aboutCards = document.querySelectorAll('.about-card');
    
    aboutCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
      
      // Add staggered animation
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 200);
    });

    // Interest items animation
    const interestItems = document.querySelectorAll('.interest-item');
    interestItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px) scale(1.05)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0) scale(1)';
      });
    });

    // Highlight items animation
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(15px)';
        item.style.borderLeftWidth = '6px';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.borderLeftWidth = '4px';
      });
    });
  }

  // Logo Loop functionality
  function initLogoLoop() {
    const logoLoopTrack = document.getElementById('logoLoopTrack');
    const proficiencyTooltip = document.getElementById('proficiencyTooltip');
    const logoItems = document.querySelectorAll('.logo-item');
    
    if (!logoLoopTrack) return;

    // Pause on hover
    logoLoopTrack.addEventListener('mouseenter', () => {
      logoLoopTrack.classList.add('paused');
    });

    logoLoopTrack.addEventListener('mouseleave', () => {
      logoLoopTrack.classList.remove('paused');
    });

    // Handle logo item interactions
    logoItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const skill = item.getAttribute('data-skill');
        const proficiency = parseInt(item.getAttribute('data-proficiency'));
        
        showProficiencyTooltip(e, skill, proficiency);
      });

      item.addEventListener('mousemove', (e) => {
        updateTooltipPosition(e);
      });

      item.addEventListener('mouseleave', () => {
        hideProficiencyTooltip();
      });
    });
  }

  function showProficiencyTooltip(event, skill, proficiency) {
    const tooltip = document.getElementById('proficiencyTooltip');
    if (!tooltip) return;

    const tooltipSkill = tooltip.querySelector('.tooltip-skill');
    const tooltipPercentage = tooltip.querySelector('.tooltip-percentage');
    const proficiencyFill = tooltip.querySelector('.proficiency-fill');
    const proficiencyLevel = tooltip.querySelector('.proficiency-level');

    // Update tooltip content
    tooltipSkill.textContent = skill;
    tooltipPercentage.textContent = `${proficiency}%`;
    proficiencyFill.style.width = `${proficiency}%`;
    
    // Set proficiency level
    let level = 'Beginner';
    if (proficiency >= 80) level = 'Expert';
    else if (proficiency >= 60) level = 'Advanced';
    else if (proficiency >= 40) level = 'Intermediate';
    
    proficiencyLevel.textContent = level;

    // Show tooltip
    tooltip.classList.add('visible');
    updateTooltipPosition(event);
  }

  function updateTooltipPosition(event) {
    const tooltip = document.getElementById('proficiencyTooltip');
    if (!tooltip || !tooltip.classList.contains('visible')) return;

    const x = event.clientX;
    const y = event.clientY;
    
    // Position tooltip near cursor
    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y - 100}px`;
  }

  function hideProficiencyTooltip() {
    const tooltip = document.getElementById('proficiencyTooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
    }
  }

  // Initialize all animations
  createParticles();
  initTypewriter();
  initScrollAnimations();
  initSkillAnimations();
  init3DCardEffects();
  initAboutAnimations();
  initLogoLoop();

  // ===== Navigation functionality =====
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  // Show navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Simple navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      }
    });
  });

  // ===== Experience track dragging =====
  const expTrack = document.getElementById('expTrack');
  if (expTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    expTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      expTrack.classList.add('active');
      startX = e.pageX - expTrack.offsetLeft;
      scrollLeft = expTrack.scrollLeft;
    });

    expTrack.addEventListener('mouseleave', () => {
      isDown = false;
      expTrack.classList.remove('active');
    });

    expTrack.addEventListener('mouseup', () => {
      isDown = false;
      expTrack.classList.remove('active');
    });

    expTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - expTrack.offsetLeft;
      const walk = (x - startX) * 2;
      expTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // ===== Skill tooltips =====
  document.querySelectorAll('.skill-logo').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      const tooltip = logo.querySelector('.skill-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
      }
    });

    logo.addEventListener('mouseleave', () => {
      const tooltip = logo.querySelector('.skill-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
      }
    });
  });

  console.log('All functionality loaded!');
});