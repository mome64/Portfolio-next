"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "projects",
        "experience",
        "testimonials",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle navigation clicks
  const handleNavClick = (href) => {
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // Scroll to the section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  if (!mounted) return null;

  return (
    // Modern navbar with glassmorphism effect and smooth transitions
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#121212]/90 backdrop-blur-lg shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="responsive-container flex justify-between items-center">
        {/* Brand logo/name with orange highlight */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => handleNavClick("#home")}
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span
              className={`transition-colors duration-300 ${
                scrolled
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-foreground"
              }`}
            >
              Mohammed
            </span>
            <span className="text-[#ff7f00]"> Mesoud</span>
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                onClick={() => handleNavClick(item.href)}
                className={`relative px-4 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === item.name.split("#")[1]
                    ? "text-[#ff7f00]"
                    : scrolled
                    ? "text-gray-800 dark:text-gray-200 hover:text-[#ff7f00]"
                    : "text-foreground hover:text-[#ff7f00]"
                }`}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {item.name}
                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#ff7f00] transition-all duration-300 ${
                    activeSection === item.name.split("#")[1]
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Hire Me Button */}
          <motion.button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:inline-flex items-center text-sm font-medium bg-[#ff7f00] text-white px-5 py-2.5 rounded-full hover:bg-[#e56f00] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff7f00] focus:ring-offset-2 ${
              scrolled
                ? "bg-secondary/80 text-gray-800 dark:text-gray-200 hover:text-[#ff7f00]"
                : "bg-secondary/50 text-foreground hover:text-[#ff7f00]"
            }`}
            aria-label="Toggle theme"
            whileHover={{ rotate: 30 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {theme === "light" ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiMoon size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiSun size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={toggleMenu}
            className={`md:hidden p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff7f00] focus:ring-offset-2 ${
              scrolled
                ? "bg-secondary/80 text-gray-800 dark:text-gray-200 hover:text-[#ff7f00]"
                : "bg-secondary/50 text-foreground hover:text-[#ff7f00]"
            }`}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden bg-white dark:bg-[#121212] border-t border-secondary/20 py-6 px-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="responsive-container flex flex-col space-y-2">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="py-1.5"
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`block py-4 text-lg font-medium rounded-lg px-4 transition-colors duration-300 ${
                      activeSection === item.name.split("#")[1]
                        ? "text-[#ff7f00]"
                        : "text-foreground hover:text-[#ff7f00]"
                    }`}
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="pt-2"
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="inline-flex items-center gap-2.5 text-foreground hover:text-[#ff7f00] transition-colors duration-300 py-4 text-lg font-medium rounded-lg px-4 w-full"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  Hire Me
                </button>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
