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

    // Pause on touch for mobile
    logoLoopTrack.addEventListener('touchstart', () => {
      logoLoopTrack.classList.add('paused');
    });

    logoLoopTrack.addEventListener('touchend', () => {
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
    });

    // Touch events for mobile
    expTrack.addEventListener('touchstart', (e) => {
      isDown = true;
      expTrack.classList.add('active');
      startX = e.touches[0].pageX - expTrack.offsetLeft;
      scrollLeft = expTrack.scrollLeft;
    });

    expTrack.addEventListener('touchend', () => {
      isDown = false;
      expTrack.classList.remove('active');
    });

    expTrack.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      // e.preventDefault(); // Optional: might block vertical scroll if not careful. 
      // Only prevent default if horizontal movement is detected? 
      // For now, let's keep it simple to avoid blocking page scroll unless we are sure.

      const x = e.touches[0].pageX - expTrack.offsetLeft;
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

  // ===== Project Modals Data & Logic =====
  const projectsData = {
    echosentinel: {
      title: "EchoSentinel - Gunshot Detection Agent",
      date: "2025",
      img: "assets/echosentinel.png",
      desc: "Extended a prototype for an ML model utilizing TensorFlow to filter gunshots out of background noise. This combined data from IoT devices and cameras to achieve a 35% cut in instances of false positives. A critical safety tool designed for real-time responsiveness.",
      tags: ["Python", "TensorFlow", "Streamlit", "IoT"],
      repo: "#", // Placeholder, update if user provides link
      live: "#"
    },
    postquantum: {
      title: "Post-Quantum Cryptography Scanner",
      date: "2025",
      img: "assets/postquantum.png",
      desc: "Developed Flask microservices to audit SSL/TLS configurations and automate key-store management with the help of PowerShell. These security checks led to the migration of enterprises to quantum-safe encryption.",
      tags: ["Flask", "Python", "PowerShell"],
      repo: "#",
      live: "#"
    },
    legalai: {
      title: "LegalAI - Document Intelligence Agent",
      date: "2025",
      img: "assets/legalai.png",
      desc: "Dean's Research Fund Awardee. Designed and implemented a document intelligence system using frontier open-weight LLMs via Ollama. Applied structured prompt engineering, RAG, and context grounding to extract, summarize, and answer questions over legal documents with high accuracy and low hallucination rates.",
      tags: ["React", "Flask", "Ollama", "FAISS", "RAG"],
      repo: "#",
      live: "#"
    },
    smartbottle: {
      title: "Smart Bottle Service",
      date: "2025",
      img: "assets/smartbottle.png",
      desc: "Built a dynamic pricing platform combining traditional regression-based demand forecasting with prompt-engineered frontier LLMs. It contextualizes pricing recommendations using event signals, venue metadata, and historical sales, enabling explainable, operator-friendly revenue optimization.",
      tags: ["Angular", "Flask", "Python", "ML", "SQL"],
      repo: "#",
      live: "#"
    },
    fitness: {
      title: "Fitness Tracker Web App",
      date: "2024",
      img: "assets/fitness.png",
      desc: "Developed a full-stack ASP.NET MVC web application to track user fitness metrics including workouts, exercise logs, and progress history using C# and MVC architecture. Utilized Entity Framework and SQL Server for robust data management. Integrated RESTful APIs for seamless data handling and dynamic dashboard updates.",
      tags: ["ASP.NET", "C#", "SQL Server", "HTML/CSS"],
      repo: "https://github.com/saianeesh01/PR-Tracker",
      live: "#"
    },
    sololeveling: {
      title: "Solo Leveling Task App",
      date: "May 2025",
      img: "assets/sololeveling.png",
      desc: "Inspired by the Solo Leveling anime, this gamified productivity app helps users build daily habits through quests and XP leveling. Features LangChain + Ollama integration to suggest real-life quests based on goal and streak. Built with React Native and Flask backend.",
      tags: ["React Native", "Flask", "LangChain", "Ollama"],
      repo: "https://github.com/saianeesh01/solo-leveling-task-app",
      live: "#"
    },
    gamestore: {
      title: "Video Game Store Web Application",
      date: "May 2024",
      img: "assets/gamestore.png",
      desc: "Designed a full-stack eCommerce platform allowing users to browse, purchase, and review video games. Built the frontend using HTML, CSS, JavaScript. Implemented backend using PHP and MySQL. Containerized using Docker.",
      tags: ["PHP", "MySQL", "Docker", "HTML/CSS"],
      repo: "https://github.com/saianeesh01/VideoGameStore",
      live: "#"
    },
    venomrun: {
      title: "Venom Run",
      date: "2019",
      img: "assets/venomrun.png",
      desc: "Venom Run is a symbiote-themed endless runner. Designed tight movement mechanics, reactive enemy logic, and eerie visual effects using Unity and C#. Used Photoshop to animate symbiote-inspired sprites. A creative deep dive into darker aesthetics and fast-paced level design.",
      tags: ["Unity", "C#", "Game Design", "Photoshop"],
      repo: "#",
      live: "https://aneesh-m.itch.io/venom-run"
    },
    projectiles: {
      title: "Projectiles",
      date: "2019",
      img: "assets/projectiles.png",
      desc: "2D sprite-based fighting game where characters launch signature projectile attacks. Created animated attack sequences in Photoshop and scripted combat logic in Unity. Fine-tuned hitboxes and visual feedback for an arcade-authentic feel.",
      tags: ["Unity", "C#", "Game Logic", "Animation"],
      repo: "#",
      live: "https://aneesh-m.itch.io/pro"
    },
    flashrun2: {
      title: "Flash Run 2",
      date: "2017",
      img: "assets/flashrun2.png",
      desc: "Expanded on the original: smoother animations, smarter enemies, and a more polished user experience. Introduced background music, a progressive difficulty curve, and enhanced VFX to make every sprint feel cinematic.",
      tags: ["Unity", "C#", "VFX", "Level Design"],
      repo: "#",
      live: "https://aneesh-m.itch.io/flash-run-2"
    },
    flashrun: {
      title: "Flash Run",
      date: "2017",
      img: "assets/flashrun.png",
      desc: "My very first programming project. A 2D endless runner inspired by The Flash and Mega Man sprites. Hand-animated movement states and coded hit detection from scratch. The spark that made me fall in love with coding.",
      tags: ["Unity", "C#", "First Project", "2D Art"],
      repo: "#",
      live: "https://aneesh-m.itch.io/flash-run"
    },
  };

  window.openProject = function (id) {
    const data = projectsData[id];
    if (!data) return;

    // Populate Modal
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-date').textContent = data.date;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-img').src = data.img;

    const repoBtn = document.getElementById('modal-repo');
    const liveBtn = document.getElementById('modal-live');

    if (data.repo && data.repo !== '#') {
      repoBtn.href = data.repo;
      repoBtn.style.display = 'inline-flex';
    } else {
      repoBtn.style.display = 'none';
    }

    if (data.live && data.live !== '#') {
      liveBtn.href = data.live;
      liveBtn.style.display = 'inline-flex';
    } else {
      liveBtn.style.display = 'none';
    }

    // Generate Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    data.tags.forEach(tag => {
      const sp = document.createElement('span');
      sp.className = 'highlight-item'; // Reuse existing class for style
      sp.style.padding = '0.2rem 0.6rem';
      sp.style.fontSize = '0.8rem';
      sp.style.borderRadius = '4px';
      sp.style.background = 'var(--bg-tertiary)';
      sp.style.border = '1px solid var(--border-color)';
      sp.textContent = tag;
      tagsContainer.appendChild(sp);
    });

    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  window.closeModal = function () {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close on outside click
  document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
      window.closeModal();
    }
  });

  console.log('Use openProject(id) to test modals');
}); // End of DOMContentLoaded