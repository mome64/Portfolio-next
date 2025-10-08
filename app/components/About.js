"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FiDownload,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiCode,
  FiUser,
} from "react-icons/fi";
import Link from "next/link";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    { name: "React", level: 90, icon: <FiCode /> },
    { name: "Next.js", level: 85, icon: <FiCode /> },
    { name: "JavaScript", level: 95, icon: <FiCode /> },
    { name: "TypeScript", level: 80, icon: <FiCode /> },
    { name: "Node.js", level: 85, icon: <FiCode /> },
    { name: "Python", level: 75, icon: <FiCode /> },
    { name: "UI/UX Design", level: 70, icon: <FiUser /> },
    { name: "MongoDB", level: 80, icon: <FiCode /> },
  ];

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2020 - Present",
      description:
        "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
      icon: <FiBriefcase />,
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2020",
      description:
        "Developed responsive web applications and improved user experience for enterprise clients.",
      icon: <FiBriefcase />,
    },
    {
      title: "Web Developer",
      company: "Creative Web Agency",
      period: "2016 - 2018",
      description:
        "Built custom websites and e-commerce solutions for small to medium businesses.",
      icon: <FiBriefcase />,
    },
  ];

  const education = [
    {
      title: "MSc in Computer Science",
      institution: "Tech University",
      period: "2014 - 2016",
      description:
        "Specialized in Web Technologies and Human-Computer Interaction.",
      icon: <FiBookOpen />,
    },
    {
      title: "BSc in Software Engineering",
      institution: "Engineering College",
      period: "2010 - 2014",
      description:
        "Focused on software development methodologies and system design.",
      icon: <FiBookOpen />,
    },
  ];

  const personalInfo = [
    { label: "Name", value: "Mohammed Mesoud" },
    { label: "Email", value: "hello@example.com" },
    { label: "Location", value: "San Francisco, CA" },
    { label: "Experience", value: "5+ Years" },
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
      <motion.div variants={itemVariants} className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary">{skill.icon}</span>
          <span className="font-medium text-lg">{skill.name}</span>
          <span className="text-lg ml-auto">{skill.level}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-4">
          <motion.div
            className="bg-primary h-4 rounded-full"
            initial={{ width: 0 }}
            animate={controls}
          ></motion.div>
        </div>
      </motion.div>
    );
  };

  const TimelineItem = ({ item, index }) => {
    return (
      <motion.div
        variants={itemVariants}
        className="relative pl-10 pb-12 last:pb-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary/30"></div>

        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-sm">{item.icon}</span>
        </div>

        <div className="bg-background rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <h3 className="font-bold text-2xl text-primary">{item.title}</h3>

          <p className="text-foreground/80 font-medium mt-3 text-lg">
            {item.company || item.institution}
          </p>

          <p className="text-foreground/60 text-base mt-4">{item.period}</p>

          <p className="mt-5 text-foreground/70 text-lg">{item.description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="about" className="spacious-section bg-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-24"
      >
        <h2 className="subtle-section-title">About Me</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-8 text-body">
          Get to know me better and discover my skills and experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Personal Info Card */}
        <motion.div
          className="portfolio-card p-8 shadow-lg"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 p-3 rounded-full">
              <FiUser className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold">Personal Info</h3>
          </div>

          <div className="space-y-6">
            {personalInfo.map((info, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-secondary/50 pb-4"
              >
                <span className="text-foreground/70">{info.label}</span>
                <span className="font-medium">{info.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="/Mohammed_Mesoud_Resume.pdf"
              className="portfolio-btn portfolio-btn-primary flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl text-lg w-full py-4"
              download
            >
              <FiDownload className="group-hover:animate-bounce" /> Download CV
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
            className="space-y-10 mb-16"
          >
            <motion.p
              variants={itemVariants}
              className="text-body text-foreground/80"
            >
              I'm a passionate Full Stack Developer with over 5 years of
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
              also visually appealing and user-friendly.
            </motion.p>
          </motion.div>

          <motion.div
            className="portfolio-card p-10 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex border-b border-secondary mb-10">
              <button
                className={`py-5 px-8 font-medium text-lg relative ${
                  activeTab === "skills"
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={() => setActiveTab("skills")}
              >
                Skills
                {activeTab === "skills" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                    layoutId="tabIndicator"
                  />
                )}
              </button>
              <button
                className={`py-5 px-8 font-medium text-lg relative ${
                  activeTab === "experience"
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={() => setActiveTab("experience")}
              >
                Experience
                {activeTab === "experience" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                    layoutId="tabIndicator"
                  />
                )}
              </button>
              <button
                className={`py-5 px-8 font-medium text-lg relative ${
                  activeTab === "education"
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={() => setActiveTab("education")}
              >
                Education
                {activeTab === "education" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                    layoutId="tabIndicator"
                  />
                )}
              </button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-h-[600px] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary scrollbar-rounded"
            >
              {activeTab === "skills" ? (
                <div>
                  {skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
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
