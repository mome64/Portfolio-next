"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiDownload,
  FiCheck,
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

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com",
    },
    {
      icon: <FiPhone className="text-2xl" />,
      title: "Phone",
      value: "+1 (123) 456-7890",
      link: "tel:+11234567890",
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Location",
      value: "San Francisco, CA",
      link: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <FiLinkedin size={24} />,
      url: "#",
      label: "LinkedIn",
    },
    {
      icon: <FiGithub size={24} />,
      url: "#",
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
    <section id="contact" className="spacious-section bg-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-24"
      >
        <h2 className="subtle-section-title">Get In Touch</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-8 text-body">
          Have a project in mind or want to discuss potential opportunities?
          Feel free to reach out!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="component-title">Contact Information</h3>

          <div className="space-y-8 mb-12">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                className="flex items-start gap-6 p-6 portfolio-card hover:bg-background/50 transition-colors group shadow-md hover:shadow-lg"
                whileHover={{ x: 12 }}
              >
                <div className="text-primary mt-1 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-xl">{info.title}</h4>

                  <p className="text-foreground/80 mt-2 text-lg">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            className="mb-12"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="/Mohammed_Mesoud_Resume.pdf"
              download
              className="flex items-center gap-4 p-6 portfolio-card hover:bg-primary hover:text-white transition-colors w-full max-w-xs shadow-lg hover:shadow-xl"
            >
              <FiDownload size={24} />
              <span className="text-lg">Download My CV (PDF)</span>
            </a>
          </motion.div>

          <div>
            <h4 className="font-semibold text-xl mb-6">Follow Me</h4>
            <div className="flex space-x-5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-5 rounded-full text-foreground hover:bg-primary hover:text-white transition-colors shadow-consistent shadow-consistent-hover"
                  aria-label={social.label}
                  whileHover={{ y: -6, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
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
          <div className="portfolio-card p-10 shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/3 rounded-full blur-2xl"></div>
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="mb-8">
                <label
                  htmlFor="name"
                  className="block text-foreground font-medium mb-4 text-lg"
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
                    className={`w-full px-6 py-4 bg-secondary rounded-consistent focus:outline-none focus:ring-2 ${
                      errors.name ? "focus:ring-red-500" : "focus:ring-primary"
                    } transition-all shadow-sm text-lg`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <motion.span
                      className="text-red-500 text-base mt-3 block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="email"
                  className="block text-foreground font-medium mb-4 text-lg"
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
                    className={`w-full px-6 py-4 bg-secondary rounded-consistent focus:outline-none focus:ring-2 ${
                      errors.email ? "focus:ring-red-500" : "focus:ring-primary"
                    } transition-all shadow-sm text-lg`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <motion.span
                      className="text-red-500 text-base mt-3 block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-foreground font-medium mb-4 text-lg"
                >
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={7}
                    className={`w-full px-6 py-4 bg-secondary rounded-consistent focus:outline-none focus:ring-2 ${
                      errors.message
                        ? "focus:ring-red-500"
                        : "focus:ring-primary"
                    } transition-all shadow-sm text-lg`}
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && (
                    <motion.span
                      className="text-red-500 text-base mt-3 block"
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
                className="portfolio-btn portfolio-btn-primary w-full relative overflow-hidden shadow-lg hover:shadow-xl text-lg py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    className="mt-6 p-6 bg-green-500/20 text-green-600 rounded-2xl text-center flex items-center justify-center gap-3 shadow-lg text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <FiCheck className="text-green-600" size={24} />
                    Message sent successfully! I'll get back to you soon.
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
