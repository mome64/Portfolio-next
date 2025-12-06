"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiFilter,
  FiX,
  FiSearch,
} from "react-icons/fi";
import ProjectModal from "./ProjectModal"; // Added missing import
import Image from "next/image";

const Projects = ({ isVisible = true }) => {
  const allProjects = useMemo(
    () => [
      {
        id: 0,
        title: "AI Model Compete",
        description:
          "A web platform where users can test, compare, and evaluate different AI models. Built with React and integrated with APIs for real-time model performance metrics, allowing users to submit data and see model results side by side.",
        image: "/images/aiModelCompete.png",
        tech: ["Next.js", "JavaScript", "Node.js", "API Integration"],
        liveUrl: "https://ai-model-compete.vercel.app",
        githubUrl: "https://github.com/mome64/ai-model-compete",
        category: "Frontend",
        features: [
          "Compare multiple AI models with performance metrics",
          "Submit custom input and receive real-time results",
          "Interactive UI for model evaluation and ranking",
          "Save and track previous model comparisons",
        ],
      },
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
        features: [
          "Real-time match updates with WebSocket integration",
          "Interactive chat system for fan engagement",
          "Responsive design for all device sizes",
          "User authentication and profile management",
        ],
      },
      {
        id: 5,
        title: "Next.js Admin Dashboard",
        description:
          "A modern admin dashboard built with Next.js and Tailwind CSS, providing an intuitive interface for managing users, analytics, orders, and other business data. Designed for responsive performance and ease of use.",
        image: "/images/adminDashboard.png",
        tech: ["Next.js", "React", "Tailwind CSS", "JavaScript"],
        liveUrl: "https://nextjs-admin-dashboard-main-sigma.vercel.app/",
        githubUrl: "https://github.com/mome64/nextjs-admin-dashboard",
        category: "Frontend",
        features: [
          "Responsive dashboard layout with sidebar navigation",
          "Analytics charts and data visualization components",
          "User and order management panels",
          "Interactive UI with modals, tables, and cards",
        ],
      },
      {
        id: 2,
        title: "PAMS Project",
        description:
          "A full-stack web application with user authentication, data management, and RESTful API integration. Built with React frontend and Node.js backend, featuring a dating site functionality with user profiles and matching capabilities.",
        image: "/images/pams.png",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        liveUrl: "#",
        githubUrl: "https://github.com/mome64/pams",
        category: "Full Stack",
        features: [
          "User authentication with JWT tokens",
          "Profile creation and management system",
          "Advanced matching algorithm",
          "Real-time messaging capabilities",
        ],
      },
      {
        id: 6,
        title: "3D Bike Demo",
        description:
          "An interactive 3D bike model demo built with Three.js, showcasing realistic rendering, animations, and user-controlled camera interactions. Users can rotate, zoom, and explore the bike in a web environment.",
        image: "/images/bikeDemo.png",
        tech: ["Three.js", "JavaScript", "WebGL", "GSAP"],
        liveUrl: "https://bike-demo-threejs-main-rho.vercel.app/",
        githubUrl: "https://github.com/mome64/bike-demo-threejs",
        category: "Frontend",
        features: [
          "Fully interactive 3D bike model",
          "Camera controls: rotate, zoom, and pan",
          "Smooth animations with GSAP integration",
          "High-quality WebGL rendering for realistic visuals",
        ],
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
        features: [
          "Intuitive menu browsing with category filters",
          "Customizable pizza builder with real-time pricing",
          "Shopping cart with item management",
          "Order tracking and delivery status updates",
        ],
      },
    ],
    []
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

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

  // Wrap allProjects in useMemo to prevent it from changing on every render
  const projects = useMemo(() => allProjects, [allProjects]);

  // Improved filtering with useMemo for better performance
  const filteredProjects = useMemo(() => {
    let result = projects;

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
  }, [selectedCategory, debouncedSearchQuery, projects]);

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
    searchInputRef.current?.focus();
  }, []);

  // Handle category change with smooth transition
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
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
    <section
      id="projects"
      className="compact-section overflow-x-hidden"
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        display: isVisible ? "block" : "none",
      }}
    >
      {" "}
      {/* Added overflow-x-hidden here */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-10 md:mb-12"
      >
        <h2 className="subtle-section-title">My Projects</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-4 sm:mt-5 text-body">
          Here are some of my recent projects. Each project reflects my passion
          for creating exceptional digital experiences.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 sm:mb-8 md:mb-10"
      >
        {/* Combined Search and Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`filter-button text-sm sm:text-base btn-enhanced ${
                  selectedCategory === category
                    ? "filter-button-active"
                    : "filter-button-inactive"
                }`}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-96 xl:w-[32rem]">
            <div
              className={`relative transition-all duration-300 ${
                isSearchFocused ? "scale-[1.02]" : ""
              }`}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="search-bar text-sm sm:text-base focus-enhanced w-full"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              />
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-foreground/50 text-base sm:text-lg" />

              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <FiX size={16} className="sm:hidden" />
                  <FiX size={18} className="hidden sm:block" />
                </button>
              )}
            </div>

            {/* Search Tips - positioned absolutely within the search container */}
            {isSearchFocused && !searchQuery && (
              <div className="absolute left-0 right-0 mt-2 z-10">
                <div className="bg-secondary rounded-xl p-3 sm:p-4 shadow-lg animate-fadeIn">
                  <p className="text-foreground/70 text-xs sm:text-sm text-center">
                    <span className="font-medium">Tip:</span> Search by
                    technology (React, Node.js), category (Frontend, Full
                    Stack), or project name
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {/* Projects Grid */}
      {/* Horizontal scroll for mobile, grid for larger screens */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="project-card group card-enhanced"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              onClick={() => openModal(project)}
              layout
            >
              <div className="h-40 sm:h-48 bg-gray-200 border-2 border-dashed w-full relative overflow-hidden">
                <div className="project-card-image group-hover:scale-105 relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="project-card-overlay">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white text-xs sm:text-sm rounded-full shadow-md">
                    View Details
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                    {project.title}
                  </h3>

                  <span className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                    {project.category}
                  </span>
                </div>

                <p className="text-foreground/70 mb-4 sm:mb-5 text-sm sm:text-base line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4 md:mb-6">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="tech-tag text-xs px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 btn-enhanced"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 bg-secondary text-foreground/60 rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 md:pt-5 border-t border-secondary/50">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-primary text-xs sm:text-sm md:text-base btn-enhanced flex-1 text-center"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    <FiExternalLink size={12} className="sm:hidden" />
                    <FiExternalLink
                      size={14}
                      className="hidden sm:block md:hidden"
                    />
                    <FiExternalLink size={16} className="hidden md:block" />{" "}
                    <span className="hidden xs:inline">Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-secondary text-xs sm:text-sm md:text-base btn-enhanced flex-1 text-center"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    <FiGithub size={12} className="sm:hidden" />
                    <FiGithub size={14} className="hidden sm:block md:hidden" />
                    <FiGithub size={16} className="hidden md:block" />
                    <span className="hidden xs:inline">GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Horizontal scroll for mobile devices */}
      <div className="sm:hidden flex overflow-x-auto pb-4 -mx-4 px-4 gap-4 scrollbar-hide">
        <div className="flex gap-4 w-max">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="project-card group card-enhanced w-80 flex-shrink-0"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              onClick={() => openModal(project)}
              layout
            >
              <div className="h-40 bg-gray-200 border-2 border-dashed w-full relative overflow-hidden">
                <div className="project-card-image group-hover:scale-105 relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="project-card-overlay">
                  <span className="px-3 py-1.5 bg-primary text-white text-xs rounded-full shadow-md">
                    View Details
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold leading-tight">
                    {project.title}
                  </h3>

                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                    {project.category}
                  </span>
                </div>

                <p className="text-foreground/70 mb-4 text-sm line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="tech-tag text-xs px-2 py-1 btn-enhanced"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-secondary text-foreground/60 rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-secondary/50">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-primary text-xs btn-enhanced flex-1 text-center"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    <FiExternalLink size={12} /> Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-secondary text-xs btn-enhanced flex-1 text-center"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    <FiGithub size={12} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 sm:py-16 md:py-20"
        >
          <p className="text-foreground/70 text-body mb-4 sm:mb-6">
            No projects found matching your criteria. Try a different filter or
            search term.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              searchInputRef.current?.focus();
            }}
            className="portfolio-btn portfolio-btn-primary text-sm sm:text-base btn-enhanced"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Clear Filters
          </button>
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
