"use client";

import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import LazySection from "./components/LazySection";

export default function Home() {

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("appear");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <LazySection animation="slideUp">
          <About />
        </LazySection>
        <LazySection animation="slideUp" threshold={0.2}>
          <Projects />
        </LazySection>
        <LazySection animation="slideUp" threshold={0.2}>
          <Experience />
        </LazySection>
        <LazySection animation="slideUp" threshold={0.2}>
          <Testimonials />
        </LazySection>
        <LazySection animation="slideUp" threshold={0.2}>
          <Contact />
        </LazySection>
      </main>
      <LazySection animation="fade" threshold={0.1}>
        <Footer />
      </LazySection>
    </div>
  );
}
