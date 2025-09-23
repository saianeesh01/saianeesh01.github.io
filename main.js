/* Intersection-observer fade-ins */
const faders = document.querySelectorAll('.fade');
const obs = new IntersectionObserver(
  entries => entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target);}
  }),
  {threshold:0.2}
);
faders.forEach(el=>obs.observe(el));

/* Keep the existing fade-in observer */

/* Skill rings: read % from data-skill attr */
document.querySelectorAll('.skill-logo').forEach(el=>{
  const pct = el.dataset.skill || 0;
  el.style.setProperty('--deg', pct * 3.6); // 100% -> 360deg
});

// main.js  (put this in the repo root)
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade');

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  faders.forEach(el => io.observe(el));

  // Respect reduced motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.fade').forEach(el => el.classList.add('show'));
  }

  // ===== Navigation functionality =====
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  // Show navbar on scroll
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
    
    lastScrollY = currentScrollY;
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

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Active navigation indicator
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => navObserver.observe(section));

  // ===== Jarvis orbit icons on hover =====
  const social = document.querySelector('.social-circle');
  const container = document.querySelector('.profile-image-container');
  if (social && container) {
    const icons = Array.from(social.querySelectorAll('.icon'));
    const placeIcons = (r = 120) => {
      icons.forEach((el, idx) => {
        const angle = (idx / icons.length) * Math.PI * 2 - Math.PI / 2; // start top
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        el.dataset.tx = x;
        el.dataset.ty = y;
        // write CSS vars for fallback
        el.style.setProperty('--tx', `${x}px`);
        el.style.setProperty('--ty', `${y}px`);
      });
    };
    placeIcons(100);

    const hasHover = !window.matchMedia || !window.matchMedia('(hover: none)').matches;

    const reveal = () => {
      container.classList.add('icons-shown');
      if (!prefersReduced) {
        icons.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = `translate(${el.dataset.tx}px, ${el.dataset.ty}px) scale(1)`;
          el.style.transition = 'all 0.5s ease-out';
        });
      } else {
        icons.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = `translate(${el.dataset.tx}px, ${el.dataset.ty}px) scale(1)`;
        });
      }
    };

    const retract = () => {
      container.classList.remove('icons-shown');
      if (!prefersReduced) {
        icons.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translate(0,0) scale(.6)';
          el.style.transition = 'all 0.3s ease-out';
        });
      } else {
        icons.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translate(0,0) scale(.6)';
        });
      }
    };

    if (hasHover) {
      container.addEventListener('mouseenter', reveal);
      container.addEventListener('mouseleave', retract);
    } else {
      // Touch devices: show positioned icons by default
      reveal();
    }
  }

  // ===== Skill rings fill on scroll =====
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const pct = parseFloat(el.dataset.skill || '0');
      const deg = pct * 3.6;
      el.style.setProperty('--deg', 0);
      
      // Simple CSS transition instead of anime.js
      setTimeout(() => {
        el.style.setProperty('--deg', deg);
      }, 100);
      
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-logo').forEach(el => skillObserver.observe(el));

  // ===== Experience cards stagger reveal =====
  const expSection = document.getElementById('experience');
  if (expSection) {
    const cards = expSection.querySelectorAll('.exp-card');
    const expObs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Simple stagger animation with CSS transitions
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 120);
        });
        
        o.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    expObs.observe(expSection);
  }

  // ===== Project card tilt/parallax =====
  document.querySelectorAll('.proj-card').forEach(card => {
    let leaveTimer;
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * 6;
      const rotateX = -((y - midY) / midY) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseenter', () => {
      clearTimeout(leaveTimer);
      card.style.transform = 'scale(1.02)';
      card.style.transition = 'transform 0.18s ease-out';
    });
    card.addEventListener('mouseleave', () => {
      leaveTimer = setTimeout(() => {
        card.style.transform = 'perspective(800px)';
        card.style.transition = 'transform 0.22s ease-out';
      }, 0);
    });

    // Slide-up info on hover
    const info = card.querySelector('.proj-info');
    card.addEventListener('mouseenter', () => {
      if (!info) return;
      info.style.transform = 'translateY(0)';
      info.style.opacity = '1';
      info.style.transition = 'all 0.26s ease-out';
    });
    card.addEventListener('mouseleave', () => {
      if (!info) return;
      info.style.transform = 'translateY(16px)';
      info.style.opacity = '0.9';
      info.style.transition = 'all 0.22s ease-out';
    });
  });

  // ===== Scroll progress bar =====
  const progressEl = document.querySelector('.scroll-progress__bar');
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressEl.style.width = `${pct}%`;
    progressEl.style.transition = 'width 0.12s linear';
  };
  if (progressEl) {
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  // ===== Resume click confetti =====
  const resumeLink = document.querySelector('.icon4');
  if (resumeLink) {
    resumeLink.addEventListener('click', (e) => {
      const rect = resumeLink.getBoundingClientRect();
      const originX = rect.left + rect.width / 2 + window.scrollX;
      const originY = rect.top + rect.height / 2 + window.scrollY;

      const particles = Array.from({ length: 26 }).map(() => {
        const el = document.createElement('span');
        el.className = 'confetti';
        document.body.appendChild(el);
        return el;
      });

      particles.forEach((p, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const radius = 60 + Math.random() * 40;
        const tx = originX + Math.cos(angle) * radius;
        const ty = originY + Math.sin(angle) * radius;
        p.style.position = 'absolute';
        p.style.left = `${originX}px`;
        p.style.top = `${originY}px`;
        p.style.width = '6px';
        p.style.height = '6px';
        p.style.borderRadius = '2px';
        p.style.background = ['#FF0033','#ff9aa2','#ff5e7a','#ffffff'][i % 4];
        p.style.pointerEvents = 'none';

        // Simple CSS animation instead of anime.js
        p.style.transition = 'all 0.8s ease-out';
        setTimeout(() => {
          p.style.transform = `translate(${tx - originX}px, ${ty - originY - (Math.random()*40)}px) rotate(${Math.random()*360}deg)`;
          p.style.opacity = '0';
          p.style.scale = '0.8';
        }, 10);

        setTimeout(() => p.remove(), 800);
      });
    });
  }
});