"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiTwitter,
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/contact", formData);

      if (response.data.success) {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setIsSubmitting(false);
        setSubmitStatus("error");

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setSubmitStatus("error");

      // Log more detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        // Check if this is a connection error
        if (!error.request.response) {
          console.error(
            "This might be a connection error. Check if the server is running on the correct port."
          );
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email",
      value: "mesoudmohammed393@gmail.com",
      link: "mailto:mesoudmohammed393@gmail.com",
    },
    {
      icon: <FiPhone className="text-2xl" />,
      title: "Phone",
      value: "+251903169980",
      link: "tel:+251903169980",
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Location",
      value: "South Wello, Kombolcha",
      link: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <FiLinkedin size={24} />,
      url: "https://www.linkedin.com/in/mohammed-mesoud",
      label: "LinkedIn",
    },
    {
      icon: <FiGithub size={24} />,
      url: "https://github.com/mome64",
      label: "GitHub",
    },
    {
      icon: <FiTwitter size={24} />,
      url: "#",
      label: "Twitter",
    },
  ];

  if (!isClient) return null;

  return (
    <section
      id="contact"
      className="standard-section bg-secondary/20 dark:bg-secondary/10"
      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="subtle-section-title">Get In Touch</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-6 text-body">
          Have a project in mind or want to discuss potential opportunities?
          Feel free to reach out!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div>
            <h3 className="component-title mb-8">Contact Information</h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="flex items-start gap-6 p-6 portfolio-card hover:bg-background/50 transition-colors group shadow-md hover:shadow-lg dark:hover:bg-secondary/30"
                  whileHover={{ x: 10 }}
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  <div className="text-primary mt-1 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground leading-tight">
                      {info.title}
                    </h4>
                    <p className="text-foreground/80 mt-2 text-base">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xl mb-6 text-foreground">
              Follow Me
            </h4>
            <div className="flex space-x-5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-5 rounded-full text-foreground hover:bg-primary hover:text-white transition-colors shadow-consistent shadow-consistent-hover dark:bg-secondary dark:hover:bg-primary"
                  aria-label={social.label}
                  whileHover={{ y: -6, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="portfolio-card p-6 md:p-8 shadow-xl relative overflow-hidden dark:bg-secondary/20">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/3 rounded-full blur-2xl"></div>
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-foreground font-medium mb-3 text-base"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-secondary rounded-consistent focus:outline-none focus:ring-2 ${
                      errors.name ? "focus:ring-red-500" : "focus:ring-primary"
                    } transition-all shadow-sm text-base dark:bg-secondary/30 dark:text-foreground`}
                    placeholder="Your name"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  />
                  {errors.name && (
                    <motion.span
                      className="text-red-500 text-sm mt-2 block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-foreground font-medium mb-3 text-base"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-secondary rounded-consistent focus:outline-none focus:ring-2 ${
                      errors.email ? "focus:ring-red-500" : "focus:ring-primary"
                    } transition-all shadow-sm text-base dark:bg-secondary/30 dark:text-foreground`}
                    placeholder="your.email@example.com"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  />
                  {errors.email && (
                    <motion.span
                      className="text-red-500 text-sm mt-2 block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-foreground font-medium mb-3 text-base"
                >
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-secondary rounded-consistent focus:outline-none focus:ring-2 ${
                      errors.message
                        ? "focus:ring-red-500"
                        : "focus:ring-primary"
                    } transition-all shadow-sm text-base dark:bg-secondary/30 dark:text-foreground resize-y min-h-[120px]`}
                    placeholder="Your message here..."
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  ></textarea>
                  {errors.message && (
                    <motion.span
                      className="text-red-500 text-sm mt-2 block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="portfolio-btn portfolio-btn-primary w-full relative overflow-hidden shadow-lg hover:shadow-xl text-base py-3.5 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>Send Message</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    className="mt-6 p-6 bg-green-500/20 text-green-700 rounded-2xl text-center flex items-center justify-center gap-3 shadow-lg text-lg dark:bg-green-500/10 dark:text-green-400 border border-green-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold">Message Sent Successfully!</h4>
                      <p className="text-sm mt-1">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    className="mt-6 p-6 bg-red-500/20 text-red-700 rounded-2xl text-center flex items-center justify-center gap-3 shadow-lg text-lg dark:bg-red-500/10 dark:text-red-400 border border-red-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold">Failed to Send Message</h4>
                      <p className="text-sm mt-1">
                        Something went wrong. Please try again or contact me
                        directly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
