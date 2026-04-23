
import "./styles/Work.css";
import WorkImage from "./WorkImage";

interface Project {
  title: string;
  category: string;
  tools: string;
  description: string;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "EchoSentinel - Gunshot Detection",
    category: "AI / IoT Security",
    tools: "TensorFlow, Python, IoT, Camera Fusion",
    description: "Extended an ML prototype utilizing TensorFlow to filter gunshots from background noise. Integrated IoT and camera data to achieve a 35% reduction in false positives.",
    image: "/images/echosentinel.png",
  },
  {
    title: "Post-Quantum Cryptography Scanner",
    category: "Cybersecurity",
    tools: "Flask, Python, PowerShell, SSL/TLS",
    description: "Developed Flask microservices to audit SSL/TLS configurations and automate key-store management with PowerShell, assisting enterprise migration to quantum-safe encryption.",
    image: "/images/pq_scanner.png",
  },
  {
    title: "LegalAI - Document Intelligence",
    category: "NLP / Document Intelligence",
    tools: "Ollama, FAISS, React, Flask",
    description: "Built an LLM-based document intelligence platform utilizing Ollama and FAISS for semantic searching, processing complex legal documents in under 5 minutes.",
    image: "/images/legalai.png",
  },
  {
    title: "House Price Prediction",
    category: "Data Science / Machine Learning",
    tools: "R, Random Forest, ggplot2, caret, MASS",
    description: "Built an end-to-end ML pipeline in R comparing Linear Regression and Random Forest models on the Boston Housing dataset. Engineered features like rooms_per_person and crime_log, achieving 90.7% R² with Random Forest — a 29% RMSE improvement over the linear baseline.",
    image: "/images/house_price_prediction.png",
    link: "https://github.com/saianeesh01/House_price_prediction",
  },
  {
    title: "Smart Bottle Service",
    category: "ML Dynamic Pricing",
    tools: "Angular, Flask, Scikit-Learn, ML",
    description: "Implements dynamic pricing depending on the real-time crowd metrics of clubs, algorithmically calculating and adjusting price variability based on demand.",
    image: "/images/smart_bottle.png",
  },
  {
    title: "Fitness Tracker App",
    category: "Full Stack Web App",
    tools: "Angular, Java, Spring Boot, SQL, Docker",
    description: "Engineered scalable RESTful backend services utilizing comprehensive Java/Spring principles and API-driven architectural design.",
    image: "/images/fitness_tracker.png",
  },
];

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        
        <div className="projects-list">
          {projects.map((project, index) => (
            <div className={`project-row ${index % 2 !== 0 ? 'project-row-reversed' : ''}`} key={index}>
              <div className="project-info">
                <div className="project-number">
                  <h3>0{index + 1}</h3>
                </div>
                <div className="project-details">
                  <h4>{project.title}</h4>
                  <p className="project-category">{project.category}</p>
                  <div className="project-tools">
                    <span className="tools-label">Tools & Features</span>
                    <p>{project.tools}</p>
                  </div>
                  <div className="project-desc">
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="project-image-wrapper">
                <WorkImage image={project.image} alt={project.title} link={project.link} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
