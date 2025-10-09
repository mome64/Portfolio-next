"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiCode,
  FiSmartphone,
} from "react-icons/fi";

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  // Determine icon based on category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Mobile":
        return <FiSmartphone className="text-primary" size={20} />;
      case "Backend":
        return <FiCode className="text-primary" size={20} />;
      default:
        return <FiGlobe className="text-primary" size={20} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          <motion.div
            className="project-modal max-h-[95vh] w-full max-w-4xl bounce-in"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 rounded-full bg-secondary/80 text-foreground hover:text-primary hover:bg-secondary transition-all duration-300 z-10 shadow-lg btn-enhanced"
                aria-label="Close modal"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <FiX size={20} className="sm:hidden" />
                <FiX size={24} className="hidden sm:block" />
              </button>

              <div className="h-48 sm:h-64 md:h-80 w-full relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-modal-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-6 mb-6">
                  <div className="flex-1 min-w-[200px]">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                      {project.title}
                    </h2>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {getCategoryIcon(project.category)}
                      <span>{project.category}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn portfolio-btn-primary text-sm sm:text-base py-2.5 px-4 sm:px-6 btn-enhanced flex items-center gap-2"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      <FiExternalLink size={16} className="sm:hidden" />
                      <FiExternalLink size={18} className="hidden sm:block" />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn portfolio-btn-secondary text-sm sm:text-base py-2.5 px-4 sm:px-6 btn-enhanced flex items-center gap-2"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      <FiGithub size={16} className="sm:hidden" />
                      <FiGithub size={18} className="hidden sm:block" />
                      <span className="hidden sm:inline">GitHub</span>
                      <span className="sm:hidden">Code</span>
                    </a>
                  </div>
                </div>

                <div className="prose prose-headings:text-foreground prose-p:text-foreground/80 prose-li:text-foreground/80 max-w-none mb-6 sm:mb-8">
                  <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.tech.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="tech-tag text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 btn-enhanced"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -3 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-secondary/50 p-5 sm:p-6 rounded-xl card-enhanced">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                      {getCategoryIcon(project.category)} Key Features
                    </h3>
                    <ul className="space-y-3">
                      {project.features && project.features.length > 0 ? (
                        project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-primary mt-1.5 text-sm">
                              •
                            </span>
                            <span className="text-foreground/80 text-sm sm:text-base">
                              {feature}
                            </span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="flex items-start gap-3">
                            <span className="text-primary mt-1.5 text-sm">
                              •
                            </span>
                            <span className="text-foreground/80 text-sm sm:text-base">
                              Responsive design that works on all device sizes
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-primary mt-1.5 text-sm">
                              •
                            </span>
                            <span className="text-foreground/80 text-sm sm:text-base">
                              Optimized performance with modern best practices
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-primary mt-1.5 text-sm">
                              •
                            </span>
                            <span className="text-foreground/80 text-sm sm:text-base">
                              Intuitive user interface with smooth animations
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-primary mt-1.5 text-sm">
                              •
                            </span>
                            <span className="text-foreground/80 text-sm sm:text-base">
                              Robust error handling and validation
                            </span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="bg-secondary/50 p-5 sm:p-6 rounded-xl card-enhanced">
                    <h3 className="text-lg sm:text-xl font-bold mb-4">
                      Project Highlights
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">
                          Development Approach
                        </h4>
                        <p className="text-foreground/70 text-xs sm:text-sm mt-2">
                          Built with modern development practices focusing on
                          maintainability and scalability.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">
                          Performance
                        </h4>
                        <p className="text-foreground/70 text-xs sm:text-sm mt-2">
                          Optimized for fast loading times and smooth
                          interactions.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">
                          User Experience
                        </h4>
                        <p className="text-foreground/70 text-xs sm:text-sm mt-2">
                          Designed with accessibility and usability as primary
                          considerations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default ProjectModal;
