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

<script>
document.getElementById("chatbot-toggle").addEventListener("click", () => {
  document.getElementById("chatbot-modal").classList.toggle("hidden");
});

async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

  const response = await fetch('https://aneesh-chatbot-backend.onrender.com/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = '';
}
</script>
