"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FiDownload,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiUser,
  FiMail,
  FiMapPin,
  FiCoffee,
  FiPhone,
} from "react-icons/fi";
// Importing Si icons for technology logos
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    {
      name: "React",
      level: 90,
      icon: <SiReact className="text-[#61DAFB]" />,
      category: "frontend",
    },
    {
      name: "Next.js",
      level: 85,
      icon: <SiNextdotjs className="text-black dark:text-white" />,
      category: "frontend",
    },
    {
      name: "JavaScript",
      level: 95,
      icon: <SiJavascript className="text-[#F7DF1E]" />,
      category: "frontend",
    },
    {
      name: "TypeScript",
      level: 80,
      icon: <SiTypescript className="text-[#3178C6]" />,
      category: "frontend",
    },
    {
      name: "Node.js",
      level: 85,
      icon: <SiNodedotjs className="text-[#339933]" />,
      category: "backend",
    },
    {
      name: "Python",
      level: 75,
      icon: <SiPython className="text-[#3776AB]" />,
      category: "backend",
    },
    {
      name: "MongoDB",
      level: 80,
      icon: <SiMongodb className="text-[#47A248]" />,
      category: "database",
    },
    { name: "UI/UX Design", level: 70, icon: <FiUser />, category: "design" },
    {
      name: "Tailwind CSS",
      level: 90,
      icon: <SiTailwindcss className="text-[#06B6D4]" />,
      category: "frontend",
    },
  ];

  const experiences = [
    {
      title: "Student Internship",
      company: "Kombolcha Textile Share Company (KTSC)",
      period: "Jan 2025 – Mar 2025",
      description: "Web development and digital modernization intern.",
      responsibilities: [
        "Developed web-based shopping platform with HTML, CSS, JS, PHP, XAMPP",
        "Improved online presence and sales/inventory systems",
        "Collaborated on system analysis, testing, and secure database operations",
        "Gained real-world software engineering experience",
      ],
      icon: <FiBriefcase />,
    },
    {
      title: "Remote Freelance Developer",
      company: "Self-Employed",
      period: "2024 – Present",
      description:
        "Full-stack developer creating custom websites and applications.",
      responsibilities: [
        "Built full-stack apps with real-time features (chat, dashboards, e-commerce)",
        "Delivered end-to-end projects from design to deployment",
        "Managed client communication and project timelines",
        "Specialized in responsive, modern web applications",
      ],
      icon: <FiBriefcase />,
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
      icon: <FiBriefcase />,
    },
  ];

  const education = [
    {
      title: "Bachelor of Science in Information Science",
      institution: "Haramaya University",
      period: "2022 - 2025",
      description:
        'Graduated with honors. Specialized in information systems and data management. Completed thesis on "Information Systems in Modern Organizations".',
      icon: <FiBookOpen />,
    },
    {
      title: "Self-taught Developer",
      institution: "Online Courses & Personal Projects",
      period: "2020 - Present",
      description:
        "Continuously learning new technologies through online courses, tutorials, and hands-on projects. Specialized in modern web development technologies.",
      icon: <FiBookOpen />,
    },
  ];

  const personalInfo = [
    { label: "Name", value: "Mohammed Mesoud", icon: <FiUser /> },
    { label: "Email", value: "mesoudmohammed393@gmail.com", icon: <FiMail /> },
    { label: "Phone", value: "+251903169980", icon: <FiPhone /> },
    { label: "Location", value: "South Wello, Kombolcha", icon: <FiMapPin /> },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      },
    },
  };

  const SkillBar = ({ skill, index }) => {
    const controls = useAnimation();

    useEffect(() => {
      if (isVisible) {
        controls.start({
          width: `${skill.level}%`,
          transition: { duration: 1, delay: index * 0.1 },
        });
      }
    }, [isVisible, skill.level, index, controls]);

    return (
      <motion.div variants={itemVariants} className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary">{skill.icon}</span>
          <span className="font-medium text-sm">{skill.name}</span>
          <span className="text-xs ml-auto">{skill.level}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2.5">
          <motion.div
            className="bg-gradient-to-r from-primary to-orange-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={controls}
          ></motion.div>
        </div>
      </motion.div>
    );
  };

  const TimelineItem = ({ item, index }) => {
    // Check if this is an experience item with responsibilities (from Experience component)
    const isExperienceWithDetails =
      item.responsibilities && Array.isArray(item.responsibilities);

    if (activeTab === "experience" && isExperienceWithDetails) {
      // Render experience items with the Experience component style
      return (
        <motion.div
          variants={itemVariants}
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <div className="bg-background rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-secondary/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-primary font-bold text-sm">
                  {item.period}
                </span>
                <h3 className="font-bold text-lg text-primary leading-tight mt-1">
                  {item.title}
                </h3>
                <p className="text-foreground/80 font-medium mt-1 text-sm">
                  {item.company}
                </p>
              </div>
            </div>

            <p className="mt-3 text-foreground/70 text-sm">
              {item.description}
            </p>
          </div>
        </motion.div>
      );
    } else {
      // Render education and default experience items with the same style
      return (
        <motion.div
          variants={itemVariants}
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <div className="bg-background rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-secondary/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-primary font-bold text-sm">
                  {item.period}
                </span>
                <h3 className="font-bold text-lg text-primary leading-tight mt-1">
                  {item.title}
                </h3>
                <p className="text-foreground/80 font-medium mt-1 text-sm">
                  {item.company || item.institution}
                </p>
              </div>
            </div>

            <p className="mt-3 text-foreground/70 text-sm">
              {item.description}
            </p>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <section
      id="about"
      className="compact-section bg-secondary/20"
      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="subtle-section-title">About Me</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-4 text-body">
          Get to know me better and discover my skills and experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Info Card */}
        <motion.div
          className="portfolio-card p-8 shadow-lg h-fit"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-orange-500 p-1">
                <div className="bg-background rounded-full w-full h-full overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/images/profile.png"
                      alt="Mohammed Mesoud"
                      fill
                      className="object-cover"
                      quality={95}
                      sizes="128px"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                3+ Years
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-1">Mohammed Mesoud</h3>
            <p className="text-primary font-medium">Full Stack Developer</p>
          </div>

          <div className="space-y-4 mb-6">
            {personalInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="text-primary">{info.icon}</span>
                </div>
                <div>
                  <p className="text-foreground/60 text-sm">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="/Mohammed_Mesoud_Resume.pdf"
              className="portfolio-btn portfolio-btn-primary flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl text-lg w-full py-3"
              download
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <FiDownload className="group-hover:animate-bounce" /> Download CV
            </a>
            <a
              href="#contact"
              className="portfolio-btn portfolio-btn-secondary flex items-center justify-center gap-3 group text-lg w-full py-3"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <FiMail className="group-hover:animate-bounce" /> Contact Me
            </a>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 mb-8"
          >
            <motion.p
              variants={itemVariants}
              className="text-body text-foreground/80"
            >
              I'm a passionate Full Stack Developer with over 3 years of
              experience creating modern web applications. I specialize in
              React, Next.js, and Node.js, and I love turning complex problems
              into simple, beautiful designs.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-body text-foreground/80"
            >
              My approach combines technical expertise with an eye for design,
              ensuring that every project I work on is not only functional but
              also visually appealing and user-friendly. I'm constantly learning
              new technologies and methodologies to stay at the forefront of web
              development.
            </motion.p>
          </motion.div>

          <motion.div
            className="portfolio-card p-6 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap border-b border-secondary mb-8">
              <button
                className={`py-4 px-6 font-medium relative transition-all duration-300 ${
                  activeTab === "skills"
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={() => setActiveTab("skills")}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Skills
              </button>
              <button
                className={`py-4 px-6 font-medium relative transition-all duration-300 ${
                  activeTab === "experience"
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={() => setActiveTab("experience")}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Experience
              </button>
              <button
                className={`py-4 px-6 font-medium relative transition-all duration-300 ${
                  activeTab === "education"
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={() => setActiveTab("education")}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Education
              </button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary scrollbar-rounded"
            >
              {activeTab === "skills" ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Frontend Skills Column */}
                    <div className="bg-background rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-secondary/50">
                      <h4 className="font-bold text-base mb-3 capitalize text-primary">
                        Frontend Skills
                      </h4>
                      <div className="space-y-4">
                        {skills
                          .filter((skill) => skill.category === "frontend")
                          .map((skill, index) => (
                            <SkillBar
                              key={skill.name}
                              skill={skill}
                              index={index}
                            />
                          ))}
                      </div>
                    </div>

                    {/* Backend, Design, and Database Skills Column */}
                    <div className="space-y-4">
                      {/* Backend Skills */}
                      <div className="bg-background rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-secondary/50">
                        <h4 className="font-bold text-base mb-3 capitalize text-primary">
                          Backend Skills
                        </h4>
                        <div className="space-y-4">
                          {skills
                            .filter((skill) => skill.category === "backend")
                            .map((skill, index) => (
                              <SkillBar
                                key={skill.name}
                                skill={skill}
                                index={index}
                              />
                            ))}
                        </div>
                      </div>

                      {/* Database Skills */}
                      <div className="bg-background rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-secondary/50">
                        <h4 className="font-bold text-base mb-3 capitalize text-primary">
                          Database Skills
                        </h4>
                        <div className="space-y-4">
                          {skills
                            .filter((skill) => skill.category === "database")
                            .map((skill, index) => (
                              <SkillBar
                                key={skill.name}
                                skill={skill}
                                index={index}
                              />
                            ))}
                        </div>
                      </div>

                      {/* Design Skills */}
                      <div className="bg-background rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-secondary/50">
                        <h4 className="font-bold text-base mb-3 capitalize text-primary">
                          Design Skills
                        </h4>
                        <div className="space-y-4">
                          {skills
                            .filter((skill) => skill.category === "design")
                            .map((skill, index) => (
                              <SkillBar
                                key={skill.name}
                                skill={skill}
                                index={index}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === "experience" ? (
                <div>
                  {experiences.map((exp, index) => (
                    <TimelineItem key={index} item={exp} index={index} />
                  ))}
                </div>
              ) : (
                <div>
                  {education.map((edu, index) => (
                    <TimelineItem key={index} item={edu} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
