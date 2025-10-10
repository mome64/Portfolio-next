"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar, FiUser } from "react-icons/fi";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote:
        "Mohammed demonstrated exceptional technical skills during his internship. He contributed significantly to our internal web systems and adapted quickly to our workflow.",
      name: "Miki Alemu",
      role: "IT Department Supervisor, Kombolcha Textile Share Company",
      gender: "female",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Working with Mohammed remotely was a great experience. He delivered high-quality, responsive web designs on time with a professional attitude.",
      name: "Samuel Getachew",
      role: "Project Manager, Samuel Tech Solutions",
      gender: "male",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "Mohammed is a reliable and talented developer. He brought technical precision and innovative ideas that elevated our web platform project.",
      name: "Hana Bekele",
      role: "UI/UX Designer",
      gender: "female",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextTestimonial();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, nextTestimonial]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }
      />
    ));
  };

  const renderGenderIcon = (gender) => {
    return <FiUser size={40} />;
  };

  return (
    <section
      id="testimonials"
      className="compact-section"
      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h2 className="subtle-section-title">Testimonials</h2>
        <p className="text-foreground/70 max-w-3xl mx-auto mt-4 text-caption">
          What clients and colleagues say about working with me
        </p>
      </motion.div>

      <div
        className="max-w-6xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mobile view - Simplified horizontal scroll */}
        <div className="sm:hidden w-full overflow-x-auto scrollbar-hide py-4 px-4 snap-x snap-mandatory">
          <div className="flex space-x-6 w-max">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[90vw] max-w-sm bg-background rounded-lg p-5 shadow-lg border border-secondary/30 backdrop-blur-sm snap-center"
              >
                <div className="flex justify-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <div className="text-3xl text-primary/10 mb-3 text-center">
                  &quot;
                </div>
                <p className="text-sm text-foreground/90 italic mb-5 text-center leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="relative w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    {renderGenderIcon(testimonial.gender)}
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-base leading-tight">
                      {testimonial.name}
                    </p>
                    <p className="text-primary mt-1 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view - 3D carousel */}
        <div className="hidden sm:block relative h-[350px] md:h-[400px] perspective-1000">
          {testimonials.map((testimonial, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            const zIndex = 10 - absOffset;
            const scale = 1 - absOffset * 0.1;
            const rotate = offset * 15;
            const translateX = offset * 120;
            const translateY = absOffset * 20;
            const opacity = 1 - absOffset * 0.3;

            return (
              <motion.div
                key={testimonial.id}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full md:w-4/5 max-w-2xl"
                style={{
                  zIndex,
                  scale,
                  opacity,
                  x: translateX,
                  y: translateY,
                  rotateY: rotate,
                }}
                animate={{
                  scale,
                  opacity,
                  x: translateX,
                  y: translateY,
                  rotateY: rotate,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => goToTestimonial(index)}
              >
                <div
                  className={`bg-background rounded-lg p-6 shadow-lg border border-secondary/30 backdrop-blur-sm ${
                    isActive ? "ring-1 ring-primary" : ""
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <div className="text-4xl text-primary/10 mb-4 text-center">
                    &quot;
                  </div>
                  <p className="text-sm md:text-base text-foreground/90 italic mb-6 text-center leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="relative w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                      {renderGenderIcon(testimonial.gender)}
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-bold text-lg leading-tight">
                        {testimonial.name}
                      </p>
                      <p className="text-primary mt-1 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile pagination dots */}
        <div className="sm:hidden flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-secondary"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Desktop navigation controls */}
        <div className="hidden sm:flex justify-center items-center mt-8 sm:mt-12 gap-3 sm:gap-4">
          <motion.button
            onClick={prevTestimonial}
            className="p-2 sm:p-3 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-white transition-colors shadow-consistent shadow-consistent-hover touch-enhanced"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <FiChevronLeft size={20} />
          </motion.button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-secondary"
                } touch-enhanced`}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextTestimonial}
            className="p-2 sm:p-3 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-white transition-colors shadow-consistent shadow-consistent-hover touch-enhanced"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <FiChevronRight size={20} />
          </motion.button>
        </div>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{
                width: isHovered
                  ? "0%"
                  : `${((currentIndex + 1) / testimonials.length) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              key={currentIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
