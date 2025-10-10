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
import Image from "next/image";

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
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          <motion.div
            className="project-modal max-h-[100vh] sm:max-h-[90vh] w-full h-full sm:h-auto overflow-y-auto bounce-in"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 rounded-full bg-secondary/80 text-foreground hover:text-primary hover:bg-secondary transition-all duration-300 z-10 shadow-lg btn-enhanced"
                aria-label="Close modal"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <FiX size={20} className="sm:hidden" />
                <FiX size={24} className="hidden sm:block" />
              </button>

              <div className="h-40 sm:h-48 md:h-64 w-full relative overflow-hidden">
                <div className="project-modal-image w-full h-full relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
              </div>

              <div className="p-4 sm:p-5 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-1 min-w-[160px]">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2">
                      {project.title}
                    </h2>
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">
                      {getCategoryIcon(project.category)}
                      <span>{project.category}</span>
                    </div>
                  </div>

                  <div className="flex gap-1.5 sm:gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn portfolio-btn-primary text-xs sm:text-sm py-2 px-3 sm:py-2.5 sm:px-4 btn-enhanced flex items-center gap-1.5 sm:gap-2"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      <FiExternalLink size={14} className="sm:hidden" />
                      <FiExternalLink size={16} className="hidden sm:block" />
                      <span className="hidden xs:inline sm:inline">
                        Live Demo
                      </span>
                      <span className="xs:hidden">Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn portfolio-btn-secondary text-xs sm:text-sm py-2 px-3 sm:py-2.5 sm:px-4 btn-enhanced flex items-center gap-1.5 sm:gap-2"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      <FiGithub size={14} className="sm:hidden" />
                      <FiGithub size={16} className="hidden sm:block" />
                      <span className="hidden xs:inline sm:inline">GitHub</span>
                      <span className="xs:hidden">Code</span>
                    </a>
                  </div>
                </div>

                <div className="prose prose-headings:text-foreground prose-p:text-foreground/80 prose-li:text-foreground/80 max-w-none mb-4 sm:mb-6">
                  <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-bold mb-2.5 sm:mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="tech-tag text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 btn-enhanced"
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

                <div className="grid grid-cols-1 gap-4 sm:gap-5 mb-4 sm:mb-6">
                  <div className="bg-secondary/50 p-4 sm:p-5 rounded-xl card-enhanced">
                    <h3 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-1.5 sm:gap-2">
                      {getCategoryIcon(project.category)} Key Features
                    </h3>
                    <ul className="space-y-2.5 sm:space-y-3">
                      {project.features && project.features.length > 0 ? (
                        project.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <span className="text-primary mt-1 text-sm">•</span>
                            <span className="text-foreground/80 text-xs sm:text-sm">
                              {feature}
                            </span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="flex items-start gap-2 sm:gap-3">
                            <span className="text-primary mt-1 text-sm">•</span>
                            <span className="text-foreground/80 text-xs sm:text-sm">
                              Responsive design that works on all device sizes
                            </span>
                          </li>
                          <li className="flex items-start gap-2 sm:gap-3">
                            <span className="text-primary mt-1 text-sm">•</span>
                            <span className="text-foreground/80 text-xs sm:text-sm">
                              Optimized performance with modern best practices
                            </span>
                          </li>
                          <li className="flex items-start gap-2 sm:gap-3">
                            <span className="text-primary mt-1 text-sm">•</span>
                            <span className="text-foreground/80 text-xs sm:text-sm">
                              Intuitive user interface with smooth animations
                            </span>
                          </li>
                          <li className="flex items-start gap-2 sm:gap-3">
                            <span className="text-primary mt-1 text-sm">•</span>
                            <span className="text-foreground/80 text-xs sm:text-sm">
                              Robust error handling and validation
                            </span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="bg-secondary/50 p-4 sm:p-5 rounded-xl card-enhanced">
                    <h3 className="text-base sm:text-lg font-bold mb-3">
                      Project Highlights
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground text-xs sm:text-sm">
                          Development Approach
                        </h4>
                        <p className="text-foreground/70 text-xs mt-1.5">
                          Built with modern development practices focusing on
                          maintainability and scalability.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-xs sm:text-sm">
                          Performance
                        </h4>
                        <p className="text-foreground/70 text-xs mt-1.5">
                          Optimized for fast loading times and smooth
                          interactions.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-xs sm:text-sm">
                          User Experience
                        </h4>
                        <p className="text-foreground/70 text-xs mt-1.5">
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
