"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
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

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  if (!mounted) return null;

  return (
    <LazySection
      as="footer"
      className="bg-secondary/30 border-t border-secondary/50"
      threshold={0.1}
    >
      <div className="standard-section py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-6"> Portfolio</h3>
            <p className="text-foreground/70 mb-8 text-body">
              Creating exceptional digital experiences with passion and
              precision.
            </p>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg py-3 px-5 bg-secondary hover:bg-secondary/80 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <>
                  <FiMoon size={20} /> Dark Mode
                </>
              ) : (
                <>
                  <FiSun size={20} /> Light Mode
                </>
              )}
            </button>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6"> Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors focus:outline-none focus:underline text-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6"> Contact Info</h4>
            <address className="not-italic text-foreground/70">
              <p className="mb-4 text-body">San Francisco, CA</p>
              <p className="mb-4 text-body">hello@example.com</p>
              <p className="text-body">+1 (123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="border-t border-secondary/30 mt-16 pt-10 text-center text-foreground/60">
          <p className="text-body">
            &copy; {new Date().getFullYear()} Mohammed Mesoud. All rights
            reserved.
          </p>
        </div>
      </div>
    </LazySection>
  );
};

export default Footer;
