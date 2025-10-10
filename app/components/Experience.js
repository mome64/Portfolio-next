"use client";

import { motion } from "framer-motion";
import LazySection from "./LazySection";

const Experience = () => {
  const experiences = [
    {
      title: "Student Internship",
      company: "Kombolcha Textile Share Company (KTSC)",
      period: "Jan 2025 – Mar 2025",
      description: "Web development intern focused on digital modernization.",
      responsibilities: [
        "Developed web-based shopping platform with HTML, CSS, JS, PHP",
        "Improved online presence and sales/inventory systems",
        "Collaborated on system analysis and secure database operations",
        "Gained real-world software engineering experience",
      ],
    },
    {
      title: "Remote Freelance Developer",
      company: "Self-Employed",
      period: "2024 – Present",
      description:
        "Full-stack developer creating custom websites and applications.",
      responsibilities: [
        "Built full-stack apps with real-time features",
        "Delivered end-to-end projects from design to deployment",
        "Managed client communication and project timelines",
        "Specialized in responsive, modern web applications",
      ],
    },
    {
      title: "Open Source & Personal Projects",
      company: "Independent Developer",
      period: "2023 – Present",
      description:
        "Developer contributing to open-source and personal projects.",
      responsibilities: [
        "Created food ordering website with admin dashboard",
        "Built Quran Listening App with React Native",
        "Developed real-time communication system with Socket.io",
        "Continuously learning new technologies",
      ],
    },
  ];

  return (
    <LazySection
      id="experience"
      className="compact-section bg-secondary/20"
      threshold={0.1}
      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
    >
      <div className="text-center mb-12">
        <h2 className="subtle-section-title">Experience & Education</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-4 text-body">
          My professional journey and educational background
        </p>
      </div>

      {/* Vertical timeline for desktop, horizontal scroll for mobile */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg z-10"></div>

                <div
                  className={`md:w-[41.66%] p-4 sm:p-6 portfolio-card shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <span className="text-primary font-bold text-base sm:text-lg">
                    {exp.period}
                  </span>

                  <h3 className="text-secondary-heading mt-2 sm:mt-3 leading-tight text-lg sm:text-xl">
                    {exp.title}
                  </h3>

                  <p className="text-primary font-medium mt-1 text-base sm:text-lg">
                    {exp.company}
                  </p>

                  <p className="mt-2 sm:mt-3 text-foreground/80 text-sm sm:text-base">
                    {exp.description}
                  </p>

                  <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start">
                        <span className="text-primary mr-2 sm:mr-3 text-base sm:text-lg">
                          •
                        </span>
                        <span className="text-foreground/80 text-sm sm:text-base">
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-[16.66%]"></div>

                <div className="md:w-[41.66%] p-6"></div>
              </motion.div>
            ))}

            <motion.div
              className="relative flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg z-10"></div>

              <div className="md:w-[41.66%] p-6"></div>

              <div className="md:w-[16.66%]"></div>

              <div className="md:w-[41.66%] p-6 portfolio-card shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 md:text-left">
                <span className="text-primary font-bold text-base sm:text-lg">
                  2022 - 2025
                </span>

                <h3 className="text-secondary-heading mt-2 sm:mt-3 leading-tight text-lg sm:text-xl">
                  Bachelor of Science in Information Science
                </h3>

                <p className="text-primary font-medium mt-1 text-base sm:text-lg">
                  Haramaya University
                </p>

                <p className="mt-2 sm:mt-3 text-foreground/80 text-sm sm:text-base">
                  Graduated with honors. Specialized in information systems and
                  data management.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll for mobile devices */}
      <div className="md:hidden flex overflow-x-auto pb-6 -mx-4 px-4 gap-6 scrollbar-hide">
        <div className="flex gap-6 w-max">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="portfolio-card p-5 shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-primary font-bold text-sm">
                    {exp.period}
                  </span>
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                </div>

                <h3 className="font-bold text-lg text-primary leading-tight mb-1">
                  {exp.title}
                </h3>

                <p className="text-foreground/80 font-medium text-sm mb-3">
                  {exp.company}
                </p>

                <p className="text-foreground/70 text-sm mb-4">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="flex items-start">
                      <span className="text-primary mr-2 text-sm">•</span>
                      <span className="text-foreground/80 text-sm">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Education item */}
          <motion.div
            className="flex-shrink-0 w-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="portfolio-card p-5 shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <span className="text-primary font-bold text-sm">
                  2022 - 2025
                </span>
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
              </div>

              <h3 className="font-bold text-lg text-primary leading-tight mb-1">
                Bachelor of Science in Information Science
              </h3>

              <p className="text-foreground/80 font-medium text-sm mb-3">
                Haramaya University
              </p>

              <p className="text-foreground/70 text-sm">
                Graduated with honors. Specialized in information systems and
                data management.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </LazySection>
  );
};

export default Experience;
