import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Development Intern</h4>
                <h5>Bank of America</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Designed features for a literacy platform on mobile using React
              Native, Flask, and SQLite. Partnered with UI/UX team using Figma
              to translate mockups into responsive React components.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Application Developer Intern</h4>
                <h5>Virginia Commonwealth University</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Maintained and enhanced VCU's WordPress multisite network (200+
              sites). Developed custom PHP plugins and modernized themes for
              accessibility (WCAG 2.1).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer Intern</h4>
                <h5>Capital One</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Built an Angular-based full-stack application to visualize AWS
              cloud infrastructure costs in real-time. Developed Java Spring
              Boot REST APIs aggregating data from Snowflake and S3.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Engineer Intern</h4>
                <h5>Insicloud</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Engineered Python-based GenAI agents using LangChain and Ollama
              to automate workflows. Optimized RAG pipelines with FAISS vector
              stores, reducing hallucinations by 40%. Deployed containerized
              microservices on AWS EC2/Lambda with Docker.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
