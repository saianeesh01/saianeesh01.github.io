/* Intersection-observer fade-ins */
const faders = document.querySelectorAll('.fade');
const obs = new IntersectionObserver(
  entries => entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target);}
  }),
  {threshold:0.2}
);
faders.forEach(el=>obs.observe(el));

/* Skill rings: read % from data-skill attr */
document.querySelectorAll('.skill-logo').forEach(el=>{
  const pct = el.dataset.skill || 0;
  el.style.setProperty('--deg', pct * 3.6); // 100% -> 360deg
});
