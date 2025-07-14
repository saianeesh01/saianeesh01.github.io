// ===== PERFORMANCE OPTIMIZATIONS =====
// Preload critical resources
document.addEventListener('DOMContentLoaded', () => {
  // Preload WebP images
  const criticalImages = [
    'assets/optimized/profile_circle.webp',
    'assets/optimized/placeholder_court_proposal_scanne.webp',
    'assets/optimized/placeholder_solo_leveling_task_app.webp'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
});

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    // Remove from DOM after animation completes
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 800);
});

// ===== INTERSECTION OBSERVER FADE-INS =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade elements
document.querySelectorAll('.fade').forEach(el => {
  fadeObserver.observe(el);
});

// ===== SKILL LOGOS PROGRESS RINGS =====
const initializeSkillLogos = () => {
  document.querySelectorAll('.skill-logo').forEach(el => {
    const pct = el.dataset.skill || 0;
    el.style.setProperty('--deg', pct * 3.6); // Convert percentage to degrees
    
    // Add loading animation delay based on position
    const delay = Math.random() * 0.5;
    el.style.animationDelay = `${delay}s`;
  });
};

// ===== OPTIMIZED SKILL DATA MANAGEMENT =====
const skillsData = {
  'lang-skills': [
    { file: 'python.svg', label: 'Python', pct: 85 },
    { file: 'java.svg', label: 'Java', pct: 70 },
    { file: 'javascript.svg', label: 'JavaScript', pct: 80 },
    { file: 'c.svg', label: 'C', pct: 65 },
    { file: 'csharp.svg', label: 'C#', pct: 60 },
    { file: 'sql.svg', label: 'SQL', pct: 75 },
  ],
  'tool-skills': [
    { file: 'react.svg', label: 'React', pct: 80 },
    { file: 'flask.svg', label: 'Flask', pct: 78 },
    { file: 'docker.svg', label: 'Docker', pct: 75 },
    { file: 'unity.svg', label: 'Unity', pct: 65 },
    { file: 'git.svg', label: 'Git', pct: 85 },
    { file: 'github.svg', label: 'GitHub Actions', pct: 70 },
    { file: 'grpc.svg', label: 'gRPC', pct: 55 },
  ],
  'cloud-skills': [
    { file: 'aws.svg', label: 'AWS', pct: 75 },
    { file: 'firebase.svg', label: 'Firebase', pct: 65 },
    { file: 'mysql.svg', label: 'MySQL', pct: 80 },
    { file: 'postgres.svg', label: 'PostgreSQL', pct: 70 },
    { file: 'sqlite.svg', label: 'SQLite', pct: 70 },
  ],
  'ml-skills': [
    { file: 'langchain.svg', label: 'LangChain', pct: 70 },
    { file: 'ollama.svg', label: 'Ollama', pct: 65 },
    { file: 'tensorflow.svg', label: 'TensorFlow', pct: 60 },
    { file: 'scikit.svg', label: 'scikit-learn', pct: 70 },
    { file: 'faiss.svg', label: 'FAISS', pct: 60 },
    { file: 'huggingface.svg', label: 'HuggingFace', pct: 75 },
    { file: 'sagemaker.svg', label: 'SageMaker', pct: 65 },
  ],
  'method-skills': [
    { file: 'agile.svg', label: 'Agile', pct: 90 },
    { file: 'tdd.svg', label: 'TDD', pct: 70 },
    { file: 'ucd.svg', label: 'User-Centred Design', pct: 75 },
    { file: 'cicd.svg', label: 'CI/CD', pct: 80 },
  ],
};

// ===== EXPERIENCE TRACK DRAG FUNCTIONALITY =====
const initializeExperienceTrack = () => {
  const track = document.getElementById('expTrack');
  if (!track) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch support for mobile
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('touchmove', (e) => {
    if (!startX) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
};

// ===== LAZY LOADING FOR IMAGES =====
const initializeLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    return;
  }

  // Fallback for browsers without native lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// ===== WEBP SUPPORT DETECTION =====
const checkWebPSupport = () => {
  const webP = new Image();
  webP.onload = webP.onerror = () => {
    if (webP.height === 2) {
      document.documentElement.classList.add('webp-support');
    } else {
      document.documentElement.classList.add('no-webp');
    }
  };
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

// ===== ENHANCED CHATBOT FUNCTIONALITY =====
let isTyping = false;
let messageHistory = [];

const chatbotAPI = {
  endpoint: 'https://aneesh-chatbot-backend.onrender.com/api/chat',
  timeout: 15000,
  retryAttempts: 3
};

const sendMessage = async () => {
  const input = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const typingIndicator = document.getElementById('typing-indicator');
  const chatBox = document.getElementById('chat-box');
  
  const message = input.value.trim();
  if (!message || isTyping) return;

  // Add user message
  addMessage(message, 'user');
  input.value = '';
  setButtonState(sendBtn, true);
  
  // Show typing indicator
  showTypingIndicator(true);
  isTyping = true;

  try {
    const response = await fetchWithTimeout(chatbotAPI.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: messageHistory.slice(-5) }) // Send last 5 messages for context
    }, chatbotAPI.timeout);

    const data = await response.json();
    
    // Add bot response
    addMessage(data.response || 'Sorry, I couldn\'t process that request.', 'bot');
    
    // Store in history
    messageHistory.push({ user: message, bot: data.response });
    
  } catch (error) {
    console.error('Chatbot error:', error);
    addMessage('Sorry, I\'m having trouble connecting right now. Please try again later.', 'error');
  } finally {
    showTypingIndicator(false);
    setButtonState(sendBtn, false);
    isTyping = false;
  }
};

const addMessage = (content, type) => {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}-message`;
  
  const icon = type === 'bot' ? '<i class="fas fa-robot"></i> Assistant' :
               type === 'error' ? 'Error' : 'You';
  
  messageDiv.innerHTML = `<strong>${icon}:</strong> ${content}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  // Add animation
  messageDiv.style.opacity = '0';
  messageDiv.style.transform = 'translateY(10px)';
  setTimeout(() => {
    messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
  }, 10);
};

const showTypingIndicator = (show) => {
  const indicator = document.getElementById('typing-indicator');
  const chatBox = document.getElementById('chat-box');
  
  if (show) {
    indicator.style.display = 'block';
    chatBox.scrollTop = chatBox.scrollHeight;
  } else {
    indicator.style.display = 'none';
  }
};

const setButtonState = (button, disabled) => {
  button.disabled = disabled;
  button.innerHTML = disabled ? 
    '<i class="fas fa-spinner fa-spin"></i>' : 
    '<i class="fas fa-paper-plane"></i>';
};

const fetchWithTimeout = (url, options, timeout) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

// ===== KEYBOARD SHORTCUTS =====
const initializeKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {
    // Enter to send message in chat
    if (e.key === 'Enter' && document.activeElement.id === 'user-input') {
      e.preventDefault();
      sendMessage();
    }
    
    // Escape to clear chat input
    if (e.key === 'Escape' && document.activeElement.id === 'user-input') {
      document.getElementById('user-input').value = '';
    }
  });
};

// ===== SMOOTH SCROLLING ENHANCEMENTS =====
const initializeSmoothScrolling = () => {
  // Enhance smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// ===== ERROR HANDLING =====
const initializeErrorHandling = () => {
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could send to analytics service
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to analytics service
  });
};

// ===== PERFORMANCE MONITORING =====
const initializePerformanceMonitoring = () => {
  if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initializeSkillLogos();
  initializeExperienceTrack();
  initializeLazyLoading();
  initializeKeyboardShortcuts();
  initializeSmoothScrolling();
  initializeErrorHandling();
  initializePerformanceMonitoring();
  checkWebPSupport();
  
  console.log('Portfolio initialized successfully');
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
