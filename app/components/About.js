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
  FiMail,
  FiMapPin,
  FiCoffee,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    { name: "React", level: 90, icon: <FiCode />, category: "frontend" },
    { name: "Next.js", level: 85, icon: <FiCode />, category: "frontend" },
    { name: "JavaScript", level: 95, icon: <FiCode />, category: "frontend" },
    { name: "TypeScript", level: 80, icon: <FiCode />, category: "frontend" },
    { name: "Node.js", level: 85, icon: <FiCode />, category: "backend" },
    { name: "Python", level: 75, icon: <FiCode />, category: "backend" },
    { name: "UI/UX Design", level: 70, icon: <FiUser />, category: "design" },
    { name: "MongoDB", level: 80, icon: <FiCode />, category: "database" },
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
    { label: "Name", value: "Mohammed Mesoud", icon: <FiUser /> },
    { label: "Email", value: "hello@example.com", icon: <FiMail /> },
    { label: "Location", value: "San Francisco, CA", icon: <FiMapPin /> },
    { label: "Experience", value: "3+ Years", icon: <FiCoffee /> },
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
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-primary">{skill.icon}</span>
          <span className="font-medium">{skill.name}</span>
          <span className="text-sm ml-auto">{skill.level}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary to-orange-500 h-3 rounded-full"
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
        className="relative pl-10 pb-10 last:pb-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>

        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-sm">{item.icon}</span>
        </div>

        <div className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-secondary/50">
          <h3 className="font-bold text-xl text-primary leading-tight">
            {item.title}
          </h3>

          <p className="text-foreground/80 font-medium mt-2">
            {item.company || item.institution}
          </p>

          <p className="text-foreground/60 text-sm mt-3">{item.period}</p>

          <p className="mt-4 text-foreground/70">{item.description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="about" className="compact-section bg-secondary/20">
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
            >
              <FiDownload className="group-hover:animate-bounce" /> Download CV
            </a>
            <a
              href="#contact"
              className="portfolio-btn portfolio-btn-secondary flex items-center justify-center gap-3 group text-lg w-full py-3"
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
            className="portfolio-card p-8 shadow-lg"
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
              >
                Education
              </button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary scrollbar-rounded"
            >
              {activeTab === "skills" ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {["frontend", "backend", "design", "database"].map(
                      (category) => {
                        const categorySkills = skills.filter(
                          (skill) => skill.category === category
                        );
                        if (categorySkills.length === 0) return null;

                        return (
                          <div
                            key={category}
                            className="bg-secondary/50 rounded-xl p-6"
                          >
                            <h4 className="font-bold text-lg mb-4 capitalize text-primary">
                              {category} Skills
                            </h4>
                            <div className="space-y-5">
                              {categorySkills.map((skill, index) => (
                                <SkillBar
                                  key={skill.name}
                                  skill={skill}
                                  index={index}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}
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
