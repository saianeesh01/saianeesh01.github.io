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
    });
  }
});
