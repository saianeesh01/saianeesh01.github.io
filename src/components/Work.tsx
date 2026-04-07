import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="carousel-desc" style={{ marginTop: '1.5rem', color: '#a1a1aa', fontSize: '1rem', lineHeight: '1.6' }}>
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
