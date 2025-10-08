"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiFilter, FiX } from "react-icons/fi";
import ProjectModal from "./ProjectModal"; // Added missing import

const Projects = ({ isVisible = true }) => {
  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  const allProjects = [
    {
      id: 1,
      title: "Football Live Application",
      description:
        "A full-stack football application with real-time features including live match updates, chat system, and fan engagement tools. A professional portfolio website built with modern web technologies including React, Next.js, Tailwind CSS, and Framer Motion. Features responsive design, smooth animations, and optimized performance for showcasing projects and skills.",
      image: "/images/full-stack.png",
      tech: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://ethiogoal.com",
      githubUrl: "https://github.com/mome64/full-stack",
      category: "Full Stack",
    },
    {
      id: 2,
      title: "PAMS Project",
      description:
        "A full-stack web application with user authentication, data management, and RESTful API integration. Built with React frontend and Node.js backend, featuring a dating site functionality with user profiles and matching capabilities.",
      image: "/images/pams.png",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/mome64/Dating-site",
      category: "Full Stack",
    },
    {
      id: 3,
      title: "Pizza App",
      description:
        "A mobile application for food ordering with cart functionality and user-friendly interface. Developed using React Native for cross-platform compatibility, allowing users to browse menu items, customize orders, and place deliveries.",
      image: "/images/pizzaApp.jpg",
      tech: ["React Native", "JavaScript", "Context API"],
      liveUrl: "#",
      githubUrl: "https://github.com/mome64/react-vite-pizza",
      category: "Frontend",
    },
    {
      id: 4,
      title: "Weather App",
      description:
        "A responsive weather application that displays current conditions and forecasts with an intuitive user interface. Integrates with weather APIs to provide accurate and up-to-date meteorological information for any location.",
      image: "/images/weather.jpg",
      tech: ["React", "CSS", "HTML", "JavaScript"],
      liveUrl: "#",
      githubUrl: "https://github.com/mome64/E-commerce",
      category: "Frontend",
    },
    {
      id: 5,
      title: "Tip Calculator",
      description:
        "A practical web application that helps users quickly calculate tip amounts and total bills. Features an intuitive interface with customizable tip percentages and supports multiple people splitting the bill.",
      image: "/images/tipCalculator.jpg",
      tech: ["HTML", "CSS", "JavaScript"],
      liveUrl: "#",
      githubUrl: "https://github.com/mome64/tip-calculator",
      category: "Frontend",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const categories = [
    "All",
    ...new Set(allProjects.map((project) => project.category)),
  ];

  // Improved filtering with useMemo for better performance
  const filteredProjects = useMemo(() => {
    let result = allProjects;

    if (selectedCategory !== "All") {
      result = result.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      result = result.filter((project) => {
        // Check title
        if (project.title.toLowerCase().includes(query)) return true;

        // Check description
        if (project.description.toLowerCase().includes(query)) return true;

        // Check technologies (exact match and partial match)
        if (
          project.tech.some(
            (tech) =>
              tech.toLowerCase().includes(query) ||
              query.includes(tech.toLowerCase())
          )
        )
          return true;

        // Check category
        if (project.category.toLowerCase().includes(query)) return true;

        // Split query into words and check if any word matches
        const queryWords = query.split(/\s+/);
        return queryWords.some(
          (word) =>
            project.title.toLowerCase().includes(word) ||
            project.description.toLowerCase().includes(word) ||
            project.tech.some((tech) => tech.toLowerCase().includes(word)) ||
            project.category.toLowerCase().includes(word)
        );
      });
    }

    return result;
  }, [selectedCategory, debouncedSearchQuery, allProjects]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="spacious-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="subtle-section-title">My Projects</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-8 text-body">
          Here are some of my recent projects. Each project reflects my passion
          for creating exceptional digital experiences.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-20 flex flex-col md:flex-row gap-10 justify-between items-center"
      >
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3.5 rounded-full text-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 px-6 py-3.5 bg-secondary rounded-full text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-lg pr-12"
          />

          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <FiX size={20} />
            </button>
          )}

          <FiFilter className="absolute right-5 top-4 text-foreground/50 text-xl" />
        </div>
      </motion.div>

      {/* Search result count */}
      {(selectedCategory !== "All" || debouncedSearchQuery) && (
        <div className="mb-6 text-foreground/70">
          <p>
            Showing {filteredProjects.length} of {allProjects.length} projects
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {debouncedSearchQuery && ` matching "${debouncedSearchQuery}"`}
          </p>
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="portfolio-card overflow-hidden cursor-pointer group shadow-md hover:shadow-xl"
              whileHover={{ y: -12 }}
              transition={{ duration: 0.3 }}
              onClick={() => openModal(project)}
              layout
            >
              <div className="h-48 bg-gray-200 border-2 border-dashed w-full relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="px-4 py-2 bg-primary text-white text-sm rounded-full shadow-md">
                    View Details
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-secondary-heading">{project.title}</h3>

                  <span className="text-sm px-3 py-1.5 bg-primary/10 text-primary rounded-full">
                    {project.category}
                  </span>
                </div>

                <p className="text-foreground/70 mb-5 text-body line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1.5 bg-secondary text-foreground/60 text-sm rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-4 pt-5 border-t border-secondary/50">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-medium text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink size={16} /> Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={16} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-foreground/70 text-body">
            No projects found matching your criteria. Try a different filter or
            search term.
          </p>
        </motion.div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Projects;
