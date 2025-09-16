// Animation Configuration for Portfolio
const ANIMATION_CONFIG = {
  "site": {
    "name": "Aneesh Mussim — Portfolio",
    "links": {
      "resume": "/assets/Aneesh_Mussim_Resume_2025.pdf",
      "linkedin": "https://linkedin.com/in/aneeshmussim",
      "github": "https://github.com/saianeesh01",
      "email": "mailto:saianeesh01@gmail.com"
    }
  },
  "scroll": {
    "observer": {
      "rootMargin": "0px 0px -15% 0px",
      "threshold": 0.15
    },
    "reveal": [
      {
        "name": "section-fade-up",
        "selector": ".section",
        "once": true,
        "anime": {
          "targets": "$elements",
          "translateY": [24, 0],
          "opacity": [0, 1],
          "duration": 800,
          "easing": "easeOutQuad",
          "delay": "anime.stagger(80)"
        }
      },
      {
        "name": "projects-stagger",
        "selector": ".project-card",
        "once": true,
        "anime": {
          "targets": "$elements",
          "translateY": [28, 0],
          "opacity": [0, 1],
          "scale": [0.98, 1],
          "duration": 700,
          "easing": "easeOutCubic",
          "delay": "anime.stagger(120)"
        }
      },
      {
        "name": "skills-bars",
        "selector": ".skill-bar[data-level]",
        "once": true,
        "custom": "el.style.setProperty('--level', el.dataset.level)",
        "anime": {
          "targets": "$elements",
          "duration": 900,
          "easing": "easeOutQuart",
          "width": ["0%", "var(--level)"]
        }
      },
      {
        "name": "timeline-pop",
        "selector": ".timeline-item",
        "once": true,
        "anime": {
          "targets": "$elements",
          "translateX": [-18, 0],
          "opacity": [0, 1],
          "scale": [0.98, 1],
          "duration": 750,
          "easing": "easeOutExpo",
          "delay": "anime.stagger(140)"
        }
      }
    ]
  },
  "hero": {
    "selector": "#hero",
    "intro": {
      "lettering": {
        "selector": ".hero-title .char",
        "anime": {
          "targets": "$elements",
          "translateY": [40, 0],
          "opacity": [0, 1],
          "duration": 700,
          "easing": "easeOutExpo",
          "delay": "anime.stagger(35, {start: 200})"
        }
      },
      "subtitle": {
        "selector": ".hero-subtitle",
        "anime": {
          "targets": "$elements",
          "opacity": [0, 1],
          "translateY": [12, 0],
          "duration": 600,
          "easing": "easeOutQuad",
          "delay": 600
        }
      },
      "cta": {
        "selector": ".hero-cta",
        "anime": {
          "targets": "$elements",
          "scale": [0.9, 1],
          "opacity": [0, 1],
          "duration": 500,
          "easing": "easeOutBack",
          "delay": 800
        }
      }
    },
    "orbits": {
      "selector": ".orbit-icon",
      "anime": {
        "targets": "$elements",
        "rotate": "1turn",
        "duration": 12000,
        "easing": "linear",
        "loop": true
      },
      "hover": {
        "anime": {
          "targets": "$element",
          "scale": [1, 1.08],
          "duration": 250,
          "easing": "easeOutQuad",
          "direction": "alternate"
        }
      }
    }
  },
  "resumeHoverCard": {
    "selector": "#resumeCard",
    "hover": {
      "glassLift": {
        "anime": {
          "targets": "$element",
          "translateY": [-6, -10],
          "scale": [1, 1.02],
          "duration": 280,
          "easing": "easeOutCubic"
        }
      },
      "shine": {
        "selector": ".shine",
        "anime": {
          "targets": "$elements",
          "translateX": ["-120%", "120%"],
          "duration": 900,
          "easing": "easeInOutSine"
        }
      },
      "linksOverlay": {
        "selector": ".overlay-links",
        "anime": {
          "targets": "$elements",
          "opacity": [0, 1],
          "translateY": [10, 0],
          "duration": 280,
          "easing": "easeOutQuad",
          "delay": "anime.stagger(80)"
        },
        "links": [
          { "type": "resume", "label": "Resume", "href": "$site.links.resume", "icon": "file-text" },
          { "type": "linkedin", "label": "LinkedIn", "href": "$site.links.linkedin", "icon": "linkedin" },
          { "type": "github", "label": "GitHub", "href": "$site.links.github", "icon": "github" },
          { "type": "email", "label": "Email", "href": "$site.links.email", "icon": "mail" }
        ]
      }
    },
    "leave": {
      "anime": {
        "targets": "$element",
        "translateY": [-10, 0],
        "scale": [1.02, 1],
        "duration": 260,
        "easing": "easeOutCubic"
      }
    }
  },
  "nav": {
    "stickyReveal": {
      "selector": "header.site-header",
      "anime": {
        "targets": "$element",
        "translateY": [-60, 0],
        "opacity": [0, 1],
        "duration": 350,
        "easing": "easeOutQuad"
      }
    },
    "activeIndicator": {
      "selector": ".nav-link",
      "onSectionEnter": {
        "anime": {
          "targets": "$element.querySelector('.indicator')",
          "width": ["0%", "100%"],
          "duration": 300,
          "easing": "easeOutCubic"
        }
      },
      "onSectionLeave": {
        "anime": {
          "targets": "$element.querySelector('.indicator')",
          "width": ["100%", "0%"],
          "duration": 250,
          "easing": "easeInCubic"
        }
      }
    }
  },
  "micro": {
    "buttons": {
      "selector": "button, .btn, .chip",
      "hover": {
        "anime": {
          "targets": "$element",
          "scale": [1, 1.03],
          "duration": 160,
          "easing": "easeOutQuad",
          "direction": "alternate"
        }
      }
    },
    "cards": {
      "selector": ".card",
      "enter": {
        "anime": {
          "targets": "$elements",
          "opacity": [0, 1],
          "translateY": [12, 0],
          "duration": 500,
          "easing": "easeOutQuad",
          "delay": "anime.stagger(60)"
        }
      }
    }
  },
  "backToTop": {
    "selector": "#backToTop",
    "showOn": 420,
    "show": {
      "anime": {
        "targets": "$element",
        "opacity": [0, 1],
        "translateY": [12, 0],
        "duration": 220,
        "easing": "easeOutQuad"
      }
    },
    "hide": {
      "anime": {
        "targets": "$element",
        "opacity": [1, 0],
        "translateY": [0, 12],
        "duration": 180,
        "easing": "easeInQuad"
      }
    },
    "click": {
      "behavior": "smooth"
    }
  }
};

// Animation Engine
class AnimationEngine {
  constructor(config) {
    this.config = config;
    this.observers = new Map();
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (this.prefersReducedMotion) {
      this.disableAnimations();
      return;
    }

    // Initialize scroll-based animations
    this.initScrollAnimations();
    
    // Initialize hero animations
    this.initHeroAnimations();
    
    // Initialize micro-interactions
    this.initMicroInteractions();
    
    // Initialize back to top button
    this.initBackToTop();
  }

  disableAnimations() {
    // Add show class to all fade elements immediately
    document.querySelectorAll('.fade, .section').forEach(el => {
      el.classList.add('show');
    });
  }

  initScrollAnimations() {
    const scrollConfig = this.config.scroll;
    const observerOptions = {
      rootMargin: scrollConfig.observer.rootMargin,
      threshold: scrollConfig.observer.threshold
    };

    scrollConfig.reveal.forEach(animation => {
      const elements = document.querySelectorAll(animation.selector);
      if (elements.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animateElement(entry.target, animation);
            this.animatedElements.add(entry.target);
            
            if (animation.once) {
              observer.unobserve(entry.target);
            }
          }
        });
      }, observerOptions);

      elements.forEach(el => observer.observe(el));
      this.observers.set(animation.name, observer);
    });
  }

  initHeroAnimations() {
    const heroConfig = this.config.hero;
    
    // Hero intro animations
    if (heroConfig.intro) {
      this.initHeroIntro(heroConfig.intro);
    }
    
    // Orbit animations
    if (heroConfig.orbits) {
      this.initOrbitAnimations(heroConfig.orbits);
    }
  }

  initHeroIntro(introConfig) {
    // Lettering animation
    if (introConfig.lettering) {
      const elements = document.querySelectorAll(introConfig.lettering.selector);
      if (elements.length > 0) {
        this.animateElement(elements, introConfig.lettering.anime);
      }
    }

    // Subtitle animation
    if (introConfig.subtitle) {
      const elements = document.querySelectorAll(introConfig.subtitle.selector);
      if (elements.length > 0) {
        this.animateElement(elements, introConfig.subtitle.anime);
      }
    }

    // CTA animation
    if (introConfig.cta) {
      const elements = document.querySelectorAll(introConfig.cta.selector);
      if (elements.length > 0) {
        this.animateElement(elements, introConfig.cta.anime);
      }
    }
  }

  initOrbitAnimations(orbitConfig) {
    const elements = document.querySelectorAll(orbitConfig.selector);
    if (elements.length === 0) return;

    // Continuous rotation
    this.animateElement(elements, orbitConfig.anime);

    // Hover effects
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.animateElement(el, orbitConfig.hover.anime);
      });
    });
  }

  initMicroInteractions() {
    const microConfig = this.config.micro;

    // Button hover effects
    if (microConfig.buttons) {
      const elements = document.querySelectorAll(microConfig.buttons.selector);
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.animateElement(el, microConfig.buttons.hover.anime);
        });
      });
    }

    // Card enter animations
    if (microConfig.cards) {
      const elements = document.querySelectorAll(microConfig.cards.selector);
      if (elements.length > 0) {
        this.animateElement(elements, microConfig.cards.enter.anime);
      }
    }
  }

  initBackToTop() {
    const backToTopConfig = this.config.backToTop;
    const element = document.querySelector(backToTopConfig.selector);
    
    if (!element) return;

    let isVisible = false;

    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldShow = scrollTop > backToTopConfig.showOn;

      if (shouldShow && !isVisible) {
        this.animateElement(element, backToTopConfig.show.anime);
        isVisible = true;
      } else if (!shouldShow && isVisible) {
        this.animateElement(element, backToTopConfig.hide.anime);
        isVisible = false;
      }
    };

    // Click behavior
    element.addEventListener('click', () => {
      if (backToTopConfig.click.behavior === 'smooth') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    });

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial check
  }

  animateElement(element, animationConfig) {
    if (!window.anime || this.prefersReducedMotion) return;

    // Handle custom logic before animation
    if (animationConfig.custom) {
      if (Array.isArray(element)) {
        element.forEach(el => this.executeCustomLogic(el, animationConfig.custom));
      } else {
        this.executeCustomLogic(element, animationConfig.custom);
      }
    }

    // Create animation options
    const options = { ...animationConfig };
    delete options.custom;

    // Replace $elements with actual elements
    if (options.targets === '$elements') {
      options.targets = element;
    } else if (options.targets === '$element') {
      options.targets = element;
    }

    // Handle stagger delays
    if (typeof options.delay === 'string' && options.delay.includes('anime.stagger')) {
      const staggerMatch = options.delay.match(/anime\.stagger\((\d+)(?:,\s*\{([^}]+)\})?\)/);
      if (staggerMatch) {
        const delay = parseInt(staggerMatch[1]);
        const optionsStr = staggerMatch[2];
        const staggerOptions = optionsStr ? this.parseStaggerOptions(optionsStr) : {};
        options.delay = window.anime.stagger(delay, staggerOptions);
      }
    }

    // Execute animation
    window.anime(options);
  }

  executeCustomLogic(element, customCode) {
    // Simple custom logic execution
    if (customCode.includes('el.style.setProperty')) {
      const match = customCode.match(/el\.style\.setProperty\('([^']+)',\s*el\.dataset\.([^)]+)\)/);
      if (match) {
        const [, property, datasetKey] = match;
        element.style.setProperty(property, element.dataset[datasetKey]);
      }
    }
  }

  parseStaggerOptions(optionsStr) {
    const options = {};
    const pairs = optionsStr.split(',').map(pair => pair.trim());
    pairs.forEach(pair => {
      const [key, value] = pair.split(':').map(s => s.trim());
      if (key && value) {
        options[key] = value === 'true' ? true : value === 'false' ? false : value;
      }
    });
    return options;
  }
}

// Initialize animation engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AnimationEngine(ANIMATION_CONFIG);
});

// Export for use in other scripts
window.AnimationEngine = AnimationEngine;
window.ANIMATION_CONFIG = ANIMATION_CONFIG;
