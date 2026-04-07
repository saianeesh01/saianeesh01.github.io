import "./styles/TechStack.css"; // We will create this next

const TechStack = () => {
  return (
    <div className="techstack" id="techstack">
      <h2>🚀 Skills</h2>
      <div className="skills-container">

        <div className="skills-category">
          <h3>Languages</h3>
          <div className="skills-grid">
            <div className="skill-item"><i className="devicon-python-plain colored"></i><span>Python</span></div>
            <div className="skill-item"><i className="devicon-java-plain colored"></i><span>Java</span></div>
            <div className="skill-item"><i className="devicon-csharp-plain colored"></i><span>C#</span></div>
            <div className="skill-item"><i className="devicon-javascript-plain colored"></i><span>JavaScript</span></div>
            <div className="skill-item"><i className="devicon-cplusplus-plain colored"></i><span>C++</span></div>
            <div className="skill-item"><i className="devicon-html5-plain colored"></i><span>HTML5</span></div>
            <div className="skill-item"><i className="devicon-css3-plain colored"></i><span>CSS3</span></div>
            <div className="skill-item"><i className="devicon-mysql-plain colored"></i><span>SQL</span></div>
          </div>
        </div>

        <div className="skills-category">
          <h3>Frameworks & Libraries</h3>
          <div className="skills-grid">
            <div className="skill-item"><i className="devicon-react-original colored"></i><span>React</span></div>
            <div className="skill-item"><i className="devicon-angularjs-plain colored"></i><span>Angular</span></div>
            <div className="skill-item"><i className="devicon-flask-original" style={{ color: "white" }}></i><span>Flask</span></div>
            <div className="skill-item"><i className="devicon-dot-net-plain colored"></i><span>.NET</span></div>
            <div className="skill-item"><i className="devicon-tensorflow-original colored"></i><span>TensorFlow</span></div>
            <div className="skill-item"><i className="devicon-pandas-plain colored"></i><span>Pandas</span></div>
            <div className="skill-item"><i className="devicon-numpy-plain colored"></i><span>NumPy</span></div>
            <div className="skill-item"><i className="devicon-scikitlearn-plain colored"></i><span>Scikit-Learn</span></div>
          </div>
        </div>

        <div className="skills-category">
          <h3>Tools & Cloud</h3>
          <div className="skills-grid">
            <div className="skill-item"><i className="devicon-amazonwebservices-plain-wordmark colored"></i><span>AWS</span></div>
            <div className="skill-item"><i className="devicon-azure-plain colored"></i><span>Azure</span></div>
            <div className="skill-item"><i className="devicon-docker-plain colored"></i><span>Docker</span></div>
            <div className="skill-item"><i className="devicon-git-plain colored"></i><span>Git</span></div>
            <div className="skill-item"><i className="devicon-jira-plain colored"></i><span>Jira</span></div>
            <div className="skill-item"><i className="devicon-postman-plain colored"></i><span>Postman</span></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechStack;
