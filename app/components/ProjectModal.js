"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-foreground hover:text-primary transition-colors z-10"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              <img
                src={project.image}
                alt={project.title}
                className="h-64 md:h-80 w-full object-cover rounded-t-xl"
              />

              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="text-3xl font-bold">{project.title}</h2>
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 btn btn-primary"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 btn btn-secondary"
                    >
                      <FiGithub /> GitHub
                    </a>
                  </div>
                </div>

                <p className="text-foreground/80 text-lg mb-6">
                  {project.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>
                  <div className="prose prose-headings:text-foreground prose-p:text-foreground/80 prose-li:text-foreground/80 max-w-none">
                    <p>
                      This project showcases my expertise in modern web
                      development techniques and demonstrates my ability to
                      create responsive, user-friendly applications. The
                      implementation follows best practices for performance,
                      accessibility, and maintainability.
                    </p>
                    <p className="mt-4">Key features include:</p>
                    <ul className="mt-2 space-y-2">
                      <li>Responsive design that works on all device sizes</li>
                      <li>
                        Optimized performance with lazy loading and code
                        splitting
                      </li>
                      <li>Intuitive user interface with smooth animations</li>
                      <li>Robust error handling and validation</li>
                      <li>Comprehensive testing suite</li>
                    </ul>
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
