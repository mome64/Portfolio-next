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
  FiSend,
} from "react-icons/fi";
import LazySection from "./LazySection";
import Image from "next/image";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setEmail("");
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

  const quickActions = [
    {
      icon: FiMail,
      text: "Email Me",
      action: () =>
        (window.location.href = "mailto:mesoudmohammed393@gmail.com"),
    },
    {
      icon: FiPhone,
      text: "Call Me",
      action: () => (window.location.href = "tel:+251903169980"),
    },
    {
      icon: FiSend,
      text: "Message",
      action: () => handleNavClick("#contact"),
    },
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
      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
    >
      <div className="standard-section py-12 xs:py-8">
        {/* Main footer content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xs:gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Brand and social section */}
          <motion.div className="md:col-span-1" variants={item}>
            <motion.h3
              className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4 leading-tight group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 transition-transform duration-300 group-hover:scale-105 rounded-full mx-auto overflow-hidden">
                <Image
                  src={
                    theme === "dark"
                      ? "/images/logo-dark.jpg"
                      : "/images/Logo.jpg"
                  }
                  alt="Mohammed Mesoud Logo"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.h3>
            <motion.p
              className="text-foreground/70 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              Creating exceptional digital experiences with passion and
              precision.
            </motion.p>

            {/* Social links */}
            <div className="flex space-x-2 sm:space-x-3 mb-3 sm:mb-4 justify-center">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={index}
                    variants={socialItem}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      className="text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1.5 sm:p-2 block bg-secondary/50 hover:bg-secondary/80 dark:bg-secondary/30 dark:hover:bg-secondary/50"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      <Icon size={16} className="xs:hidden" />
                      <Icon size={18} className="hidden xs:block sm:hidden" />
                      <Icon size={20} className="hidden sm:block" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Want to work together section */}
            <motion.div
              className="p-2.5 sm:p-3 md:p-4 bg-secondary/50 rounded-lg"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h5
                className="font-medium mb-1 sm:mb-1.5 leading-tight text-xs sm:text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Want to work together?
              </motion.h5>
              <motion.p
                className="text-[0.65rem] xs:text-xs sm:text-sm text-foreground/70 mb-1.5 sm:mb-2"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                Feel free to reach out if you&#39;re looking for a developer.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="portfolio-btn portfolio-btn-primary text-[0.65rem] xs:text-xs sm:text-sm w-full text-center block group py-1.5 sm:py-2"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  <span className="group-hover:scale-105 transition-transform duration-300">
                    Get in Touch
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Navigation section */}
          <motion.div className="md:col-span-1" variants={item}>
            <motion.h4
              className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 leading-tight group"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
            >
              <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
                Navigation
              </span>
            </motion.h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={item}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:underline text-xs sm:text-sm md:text-base flex items-center w-full text-left group py-1"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    <span className="mr-1.5 group-hover:translate-x-1 transition-transform duration-300 text-[0.65rem] xs:text-xs">
                      →
                    </span>
                    <span className="group-hover:text-primary transition-colors duration-300 text-[0.65rem] xs:text-xs sm:text-sm">
                      {link.name}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Quick actions */}
            <motion.div
              className="mt-4 sm:mt-6 md:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 leading-tight">
                Quick Actions
              </h4>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      className="flex flex-col items-center justify-center p-2 sm:p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-all duration-300 group dark:bg-secondary/50 dark:hover:bg-secondary/70 shadow-sm hover:shadow-md"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      <Icon
                        size={16}
                        className="mb-1 sm:mb-1.5 group-hover:text-primary transition-colors duration-300"
                      />
                      <span className="text-[0.6rem] xs:text-[0.65rem] sm:text-xs text-center group-hover:text-primary transition-colors duration-300">
                        {action.text}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact info section */}
          <motion.div className="md:col-span-1" variants={item}>
            <motion.h4
              className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 leading-tight group"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
            >
              <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
                Contact Info
              </span>
            </motion.h4>
            <address className="not-italic text-foreground/70 space-y-2 sm:space-y-3">
              <motion.p
                className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm group"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <FiMapPin
                  size={14}
                  className="flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors duration-300"
                />
                <span className="group-hover:text-primary transition-colors duration-300 text-xs sm:text-sm">
                  South Wello, Kombolcha
                </span>
              </motion.p>
              <motion.p
                className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm group"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <FiMail
                  size={14}
                  className="flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors duration-300"
                />
                <span className="group-hover:text-primary transition-colors duration-300 text-xs sm:text-sm">
                  mesoudmohammed393@gmail.com
                </span>
              </motion.p>
              <motion.p
                className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm group"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <FiPhone
                  size={14}
                  className="flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors duration-300"
                />
                <span className="group-hover:text-primary transition-colors duration-300 text-xs sm:text-sm">
                  +251903169980
                </span>
              </motion.p>
            </address>

            {/* Theme toggle */}
            <motion.div
              className="mt-4 sm:mt-6 md:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h4
                className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 leading-tight"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3 }}
              >
                Theme
              </motion.h4>
              <motion.button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 sm:gap-2 text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 md:px-5 bg-secondary hover:bg-secondary/80 shadow-sm w-full justify-center group dark:bg-secondary/50 dark:hover:bg-secondary/70"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {theme === "light" ? (
                  <>
                    <motion.div
                      initial={{ rotate: -30 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group-hover:text-primary transition-colors duration-300"
                    >
                      <FiMoon size={16} className="sm:size-20" />
                    </motion.div>
                    <span className="text-xs sm:text-sm group-hover:text-primary transition-colors duration-300">
                      Dark Mode
                    </span>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ rotate: 30 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group-hover:text-primary transition-colors duration-3300"
                    >
                      <FiSun size={16} className="sm:size-20" />
                    </motion.div>
                    <span className="text-xs sm:text-sm group-hover:text-primary transition-colors duration-300">
                      Light Mode
                    </span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer bottom */}
        <motion.div
          className="border-t border-secondary/30 mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 text-center text-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.p
            className="text-xs sm:text-sm group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <span className="group-hover:text-primary transition-colors duration-300">
              &copy; {new Date().getFullYear()} Mohammed Mesoud. All rights
              reserved.
            </span>
          </motion.p>
          <motion.p
            className="text-[0.6rem] xs:text-xs mt-1 text-foreground/50 group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <span className="group-hover:text-primary/70 transition-colors duration-300">
              Designed and built with ❤️
            </span>
          </motion.p>
        </motion.div>
      </div>
    </LazySection>
  );
};

export default Footer;
