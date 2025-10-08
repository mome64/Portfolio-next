"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FiDownload,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowDown,
} from "react-icons/fi";
import Link from "next/link";
import useTypewriter from "./hooks/useTypewriter";
import useParticleBackground from "./hooks/useParticleBackground";

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useParticleBackground({
    particleCount: 30,
    particleColor: "rgba(255, 127, 0, 0.6)",
    particleSize: 3,
    lineWidth: 0.5,
    lineColor: "rgba(255, 127, 0, 0.3)",
    speed: 0.4,
  });

  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Reset the typewriter when the role changes
  const {
    displayText: roleText,
    isCompleted,
    isDeleting,
    restart,
  } = useTypewriter(roles[currentRoleIndex], 100, 2000);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle role rotation with proper reset
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      // Restart the typewriter when changing roles
      restart();
    }, 5000); // Increased interval to 5000ms to allow more time for typing/deleting

    return () => clearInterval(interval);
  }, [isClient, roles.length, restart]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        ease: "easeOut",
      },
    },
  };

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="spacious-section min-h-screen flex flex-col justify-center pt-20 pb-28 relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 responsive-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Greeting Line */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl md:text-2xl font-medium text-foreground/80 mb-2">
              Hi, I'm
            </h3>
          </motion.div>

          {/* Name - Large and bold */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-primary">Mohammed Mesoud</span>
            </h1>
          </motion.div>

          {/* Profession Line */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/80 mb-8 min-h-[40px]">
              {isClient && (
                <span className="inline-block">
                  {roleText}
                  <span
                    className={`ml-1 inline-block w-2 h-8 bg-primary ${
                      isCompleted && !isDeleting ? "animate-pulse" : ""
                    }`}
                  ></span>
                </span>
              )}
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-body text-foreground/70 mb-10 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl"
          >
            I create beautiful, responsive, and user-friendly web applications
            with modern technologies. Let's build something amazing together!
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center lg:justify-start gap-6 mb-12"
          >
            <a
              href="#contact"
              className="portfolio-btn portfolio-btn-primary flex items-center gap-3 group shadow-lg hover:shadow-xl text-lg px-8 py-4"
            >
              <FiMail className="group-hover:animate-bounce" /> Hire Me
            </a>
            <a
              href="/Mohammed_Mesoud_Resume.pdf"
              className="portfolio-btn portfolio-btn-secondary flex items-center gap-3 group text-lg px-8 py-4"
              download
            >
              <FiDownload className="group-hover:animate-bounce" /> Download CV
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-start gap-6"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-300 bg-secondary/50 p-4 rounded-full shadow-consistent shadow-consistent-hover"
              aria-label="GitHub"
            >
              <FiGithub size={28} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-300 bg-secondary/50 p-4 rounded-full shadow-consistent shadow-consistent-hover"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={28} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-300 bg-secondary/50 p-4 rounded-full shadow-consistent shadow-consistent-hover"
              aria-label="Twitter"
            >
              <FiTwitter size={28} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <motion.div
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-primary/5 flex items-center justify-center"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-56 h-56 md:w-72 md:h-72 lg:w-88 lg:h-88 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-primary/20 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  {/* Profile image placeholder - replace with actual image */}
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 overflow-hidden" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-primary text-white px-5 py-3 rounded-consistent shadow-consistent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-bold text-lg">5+</span> Years Experience
            </motion.div>

            {/* Floating elements for more visual interest */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-accent/20"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-12 h-12 rounded-full bg-primary/20"
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ y: 5 }}
        onClick={scrollToNextSection}
      >
        <span className="text-foreground/70 mb-2 text-caption">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FiArrowDown className="text-foreground/50" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
