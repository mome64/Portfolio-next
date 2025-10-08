"use client";

import { motion } from "framer-motion";
import LazySection from "./LazySection";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2020 - Present",
      description:
        "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing CI/CD pipelines.",
      responsibilities: [
        "Architected and developed 5+ web applications serving 100k+ users",
        "Implemented microservices architecture reducing latency by 40%",
        "Led a team of 4 developers on various projects",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2020",
      description:
        "Developed responsive web applications and improved user experience for enterprise clients. Collaborated with UX designers to implement pixel-perfect interfaces.",
      responsibilities: [
        "Built 10+ client websites using React and Vue.js",
        "Improved page load speed by 35% through optimization techniques",
        "Implemented responsive design for mobile-first approach",
      ],
    },
    {
      title: "Web Developer",
      company: "Creative Web Agency",
      period: "2016 - 2018",
      description:
        "Built custom websites and e-commerce solutions for small to medium businesses. Managed client relationships and project timelines.",
      responsibilities: [
        "Developed 20+ websites for various clients",
        "Integrated payment gateways for e-commerce platforms",
        "Provided ongoing maintenance and support",
      ],
    },
  ];

  return (
    <LazySection
      id="experience"
      className="compact-section bg-secondary/20"
      threshold={0.1}
    >
      <div className="text-center mb-12">
        <h2 className="subtle-section-title">Experience & Education</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-4 text-body">
          My professional journey and educational background
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30 hidden md:block"></div>

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
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg z-10 hidden md:block"></div>

              <div
                className={`md:w-5/12 p-10 portfolio-card shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <span className="text-primary font-bold text-lg">
                  {exp.period}
                </span>

                <h3 className="text-secondary-heading mt-3 leading-tight">
                  {exp.title}
                </h3>

                <p className="text-primary font-medium mt-1 text-lg">
                  {exp.company}
                </p>

                <p className="mt-3 text-foreground/80 text-body">
                  {exp.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="flex items-start">
                      <span className="text-primary mr-3 text-lg">•</span>
                      <span className="text-foreground/80 text-body">
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:w-2/12 hidden md:block"></div>

              <div className="md:w-5/12 p-6"></div>
            </motion.div>
          ))}

          <motion.div
            className="relative flex flex-col md:flex-row  items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg z-10 hidden md:block"></div>

            <div className="md:w-5/12 p-10 portfolio-card shadow-lg hover:shadow-xl transition-shadow duration-300 md:text-right">
              <span className="text-primary font-bold text-lg">
                2012 - 2016
              </span>

              <h3 className="text-secondary-heading mt-3 leading-tight">
                Bachelor of Science in Computer Science
              </h3>

              <p className="text-primary font-medium mt-1 text-lg">
                University of Technology
              </p>

              <p className="mt-3 text-foreground/80 text-body">
                Graduated with honors. Specialized in web development and
                software engineering. Completed thesis on "Modern JavaScript
                Frameworks and Performance Optimization".
              </p>
            </div>

            <div className="md:w-2/12 hidden md:block"></div>

            <div className="md:w-5/12 p-6"></div>
          </motion.div>
        </div>
      </div>
    </LazySection>
  );
};

export default Experience;
