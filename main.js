/* Intersection-observer fade-ins */
const faders = document.querySelectorAll('.fade');
const obs = new IntersectionObserver(
  entries => entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target);}
  }),
  {threshold:0.2}
);
faders.forEach(el=>obs.observe(el));
/* -------- Skill logos builder -------- */
const skillsData = {
  'lang-skills': [
    {file:'python.svg',    label:'Python',      pct:85},
    {file:'java.svg',      label:'Java',        pct:70},
    {file:'javascript.svg',label:'JavaScript',  pct:80},
    {file:'c.svg',         label:'C',           pct:65},
    {file:'csharp.svg',    label:'C#',          pct:60},
    {file:'sql.svg',       label:'SQL',         pct:75},
  ],
  'tool-skills': [
    {file:'react.svg',     label:'React',       pct:80},
    {file:'flask.svg',     label:'Flask',       pct:78},
    {file:'docker.svg',    label:'Docker',      pct:75},
    {file:'unity.svg',     label:'Unity',       pct:65},
    {file:'git.svg',       label:'Git',         pct:85},
    {file:'github.svg',    label:'GitHub Actions', pct:70},
    {file:'grpc.svg',      label:'gRPC',        pct:55},
  ],
  'cloud-skills': [
    {file:'aws.svg',       label:'AWS',         pct:75},
    {file:'firebase.svg',  label:'Firebase',    pct:65},
    {file:'mysql.svg',     label:'MySQL',       pct:80},
    {file:'postgres.svg',  label:'PostgreSQL',  pct:70},
    {file:'sqlite.svg',    label:'SQLite',      pct:70},
  ],
  'ml-skills': [
    {file:'langchain.svg', label:'LangChain',   pct:70},
    {file:'ollama.svg',    label:'Ollama',      pct:65},
    {file:'tensorflow.svg',label:'TensorFlow',  pct:60},
    {file:'scikit.svg',    label:'scikit-learn',pct:70},
    {file:'faiss.svg',     label:'FAISS',       pct:60},
    {file:'huggingface.svg',label:'HuggingFace',pct:75},
    {file:'sagemaker.svg', label:'SageMaker',   pct:65},
  ],
  'method-skills': [
    {file:'agile.svg',     label:'Agile',       pct:90},
    {file:'tdd.svg',       label:'TDD',         pct:70},
    {file:'ucd.svg',       label:'User-Centred Design', pct:75},
    {file:'cicd.svg',      label:'CI/CD',       pct:80},
  ],
};

Object.entries(skillsData).forEach(([gridId, skills])=>{
  const grid = document.getElementById(gridId);
  const tmpl = document.getElementById('skill-template').content;
  skills.forEach(({file,label,pct})=>{
    const node = tmpl.cloneNode(true);
    const wrapper = node.querySelector('.skill-logo');
    wrapper.dataset.skill = pct;
    node.querySelector('img').src  = `assets/skills/${file}`;
    node.querySelector('img').alt  = label;
    node.querySelector('.skill-tooltip').textContent = `${label} ${pct}%`;
    grid.appendChild(node);
  });
});

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
    return;
  }

  // ===== Hero entrance timeline =====
  if (window.anime) {
    window.anime
      .timeline({ autoplay: true })
      .add({
        targets: '.name-part',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: window.anime.stagger(80),
        duration: 700,
        easing: 'easeOutQuad'
      })
      .add({
        targets: '.profile-img',
        scale: [0.85, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutBack'
      }, '-=400')
      .add({
        targets: '.social-circle .icon',
        scale: [0, 1],
        opacity: [0, 1],
        delay: window.anime.stagger(90),
        duration: 420,
        easing: 'easeOutBack'
      }, '-=350');

    // ===== SVG stroke draw for hero title =====
    const strokeRect = document.getElementById('hero-stroke-mask-rect');
    const svg = document.querySelector('.hero-stroke-svg');
    if (strokeRect && svg) {
      const totalW = svg.getBoundingClientRect().width;
      strokeRect.setAttribute('width', 0);
      window.anime({
        targets: strokeRect,
        width: totalW,
        duration: 1600,
        delay: 150,
        easing: 'easeInOutSine'
      });
    }

    // ===== Skill rings fill on scroll =====
    const skillObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const pct = parseFloat(el.dataset.skill || '0');
        const deg = pct * 3.6;
        el.style.setProperty('--deg', 0);
        window.anime({
          targets: el,
          '--deg': deg,
          duration: 1200,
          easing: 'easeInOutCubic'
        });
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
          window.anime({
            targets: cards,
            translateY: [30, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(120),
            duration: 600,
            easing: 'easeOutQuad'
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
        window.anime({ targets: card, scale: 1.02, duration: 180, easing: 'easeOutQuad' });
      });
      card.addEventListener('mouseleave', () => {
        leaveTimer = setTimeout(() => {
          card.style.transform = 'perspective(800px)';
          window.anime({ targets: card, scale: 1, duration: 220, easing: 'easeOutQuad' });
        }, 0);
      });

      // Slide-up info on hover via anime for extra smoothness
      const info = card.querySelector('.proj-info');
      card.addEventListener('mouseenter', () => {
        if (!info) return;
        window.anime({ targets: info, translateY: [16, 0], opacity: [0.85, 1], duration: 260, easing: 'easeOutCubic' });
      });
      card.addEventListener('mouseleave', () => {
        if (!info) return;
        window.anime({ targets: info, translateY: 16, opacity: 0.9, duration: 220, easing: 'easeOutCubic' });
      });
    });

    // ===== Scroll progress bar =====
    const progressEl = document.querySelector('.scroll-progress__bar');
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      window.anime({ targets: progressEl, width: `${pct}%`, duration: 120, easing: 'linear' });
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

          window.anime({
            targets: p,
            translateX: tx - originX,
            translateY: ty - originY - (Math.random()*40),
            rotate: Math.random()*360,
            opacity: [{ value: 1, duration: 0 }, { value: 0, duration: 700, delay: 250 }],
            scale: [{ value: 1, duration: 0 }, { value: 0.8, duration: 700 }],
            duration: 800,
            easing: 'easeOutCubic',
            complete: () => p.remove()
          });
        });
      });
    }
  }
});
