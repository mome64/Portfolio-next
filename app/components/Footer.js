"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import LazySection from "./LazySection";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Function to handle navigation clicks
  const handleNavClick = (href) => {
    // Close any mobile menus if open
    const menuButton = document.querySelector('[aria-label="Toggle menu"]');
    if (menuButton && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.click();
    }

    // Scroll to the section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/mome64", label: "GitHub" },
    {
      icon: FiLinkedin,
      href: "https://www.linkedin.com/in/mohammed-mesoud",
      label: "LinkedIn",
    },
    {
      icon: FiMail,
      href: "mailto:mesoudmohammed393@gmail.com",
      label: "Email",
    },
    { icon: FiPhone, href: "tel:+251903169980", label: "Phone" },
  ];

  if (!mounted) return null;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const socialItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <LazySection
      as="footer"
      className="bg-secondary/30 border-t border-secondary/50"
      threshold={0.1}
    >
      <div className="standard-section py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="md:col-span-1" variants={item}>
            <motion.h3
              className="text-2xl font-bold text-primary mb-6 leading-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Portfolio
            </motion.h3>
            <motion.p
              className="text-foreground/70 mb-6 text-body"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              Creating exceptional digital experiences with passion and
              precision.
            </motion.p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={index}
                    variants={socialItem}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      className="text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2 block"
                    >
                      <Icon size={20} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="md:col-span-1" variants={item}>
            <motion.h4
              className="text-xl font-semibold mb-6 leading-tight"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              Navigation
            </motion.h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={item}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:underline text-body flex items-center w-full text-left"
                  >
                    <span className="mr-2">→</span> {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="md:col-span-1" variants={item}>
            <motion.h4
              className="text-xl font-semibold mb-6 leading-tight"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              Contact Info
            </motion.h4>
            <address className="not-italic text-foreground/70 space-y-3">
              <motion.p
                className="flex items-start gap-3 text-body"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FiMapPin size={20} className="mt-1" />
                <span>South Wello, Kombolcha</span>
              </motion.p>
              <motion.p
                className="flex items-start gap-3 text-body"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FiMail size={20} className="mt-1" />
                <span>mesoudmohammed393@gmail.com</span>
              </motion.p>
              <motion.p
                className="flex items-start gap-3 text-body"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FiPhone size={20} className="mt-1" />
                <span>+251903169980</span>
              </motion.p>
            </address>
          </motion.div>

          <motion.div className="md:col-span-1" variants={item}>
            <motion.h4
              className="text-xl font-semibold mb-6 leading-tight"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              Theme
            </motion.h4>
            <motion.button
              onClick={toggleTheme}
              className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg py-3 px-5 bg-secondary hover:bg-secondary/80 shadow-sm w-full justify-center"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {theme === "light" ? (
                <>
                  <motion.div
                    initial={{ rotate: -30 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiMoon size={20} />
                  </motion.div>
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ rotate: 30 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiSun size={20} />
                  </motion.div>
                  <span>Light Mode</span>
                </>
              )}
            </motion.button>
            <motion.div
              className="mt-6 p-4 bg-secondary/50 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h5
                className="font-medium mb-2 leading-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Want to work together?
              </motion.h5>
              <motion.p
                className="text-sm text-foreground/70 mb-3"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Feel free to reach out if you're looking for a developer.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="portfolio-btn portfolio-btn-primary text-sm w-full text-center block"
                >
                  Get in Touch
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-secondary/30 mt-16 pt-8 text-center text-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.p
            className="text-body"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            &copy; {new Date().getFullYear()} Mohammed Mesoud. All rights
            reserved.
          </motion.p>
          <motion.p
            className="text-sm mt-2 text-foreground/50"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Designed and built with ❤️
          </motion.p>
        </motion.div>
      </div>
    </LazySection>
  );
};

export default Footer;
