"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-100, 100], [15, -15]);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const testimonials = [
    {
      id: 1,
      quote:
        "Mohammed transformed our online presence with a stunning website that perfectly captures our brand. His attention to detail and technical expertise are unmatched.",
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      avatar: "/avatar1.jpg",
      rating: 5,
      companyLogo: "/company1.svg",
    },
    {
      id: 2,
      quote:
        "Working with Mohammed was a game-changer for our startup. He delivered a robust, scalable solution that has helped us grow our user base by 200%.",
      name: "Michael Chen",
      role: "CEO, InnovateX",
      avatar: "/avatar2.jpg",
      rating: 5,
      companyLogo: "/company2.svg",
    },
    {
      id: 3,
      quote:
        "The e-commerce platform Mohammed built for us has increased our conversion rate by 35%. His understanding of user experience is exceptional.",
      name: "David Rodriguez",
      role: "Founder, ShopEasy",
      avatar: "/avatar3.jpg",
      rating: 5,
      companyLogo: "/company3.svg",
    },
    {
      id: 4,
      quote:
        "Mohammed's problem-solving skills and professionalism made our project a success. He consistently delivered high-quality work on time and within budget.",
      name: "Emily Watson",
      role: "Product Manager, DigitalFirst",
      avatar: "/avatar4.jpg",
      rating: 5,
      companyLogo: "/company4.svg",
    },
    {
      id: 5,
      quote:
        "I've worked with many developers, but Mohammed stands out for his creativity and technical skills. He turned our vision into reality beyond our expectations.",
      name: "James Wilson",
      role: "CTO, FutureTech",
      avatar: "/avatar5.jpg",
      rating: 5,
      companyLogo: "/company5.svg",
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
  }, [isHovered]);

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

  return (
    <section id="testimonials" className="spacious-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-24"
      >
        <h2 className="subtle-section-title">Testimonials</h2>

        <p className="text-foreground/70 max-w-3xl mx-auto mt-8 text-body">
          What clients and colleagues say about working with me
        </p>
      </motion.div>
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[450px] md:h-[500px] perspective-1000">
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
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full md:w-4/5 max-w-3xl"
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
                  className={`bg-background rounded-consistent p-10 shadow-xl border border-secondary/30 backdrop-blur-sm ${
                    isActive ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="flex justify-center mb-8">
                    {renderStars(testimonial.rating)}
                  </div>

                  <div className="text-6xl text-primary/10 mb-6 text-center">
                    "
                  </div>
                  <p className="text-body md:text-2xl text-foreground/90 italic mb-10 text-center">
                    {testimonial.quote}
                  </p>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-20 h-20" />
                    <div className="text-center md:text-left">
                      <p className="font-bold text-xl">{testimonial.name}</p>

                      <p className="text-primary mt-2 text-lg">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-8">
                    <div className="bg-gray-200 border-2 border-dashed rounded w-28 h-10" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center items-center mt-16 gap-8">
          <motion.button
            onClick={prevTestimonial}
            className="p-4 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-white transition-colors shadow-consistent shadow-consistent-hover"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft size={28} />
          </motion.button>

          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-4 h-4 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-secondary"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextTestimonial}
            className="p-4 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-white transition-colors shadow-consistent shadow-consistent-hover"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight size={28} />
          </motion.button>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="w-36 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: isHovered ? "0%" : "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              key={currentIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
