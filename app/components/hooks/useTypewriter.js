"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const useTypewriter = (text, speed = 100, delay = 0) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timeoutRef = useRef(null);

  // Clear any existing timeouts when component unmounts or text changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Reset the typewriter when text changes
  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsDeleting(false);
    setIsCompleted(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [text]);

  useEffect(() => {
    const type = () => {
      if (!isDeleting && currentIndex < text.length) {
        // Typing forward
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else if (!isDeleting && currentIndex === text.length) {
        // Finished typing
        if (!isCompleted) {
          setIsCompleted(true);
          // Pause before deleting (if delay is set)
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
              setIsCompleted(false);
            }, delay);
            return;
          }
        }
      } else if (isDeleting && currentIndex > 0) {
        // Deleting backward
        setDisplayText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      } else if (isDeleting && currentIndex === 0) {
        // Finished deleting
        setIsDeleting(false);
        setIsCompleted(false);
      }
    };

    // Set typing speed based on current state
    let currentSpeed = speed;
    if (isDeleting) {
      currentSpeed = speed / 2; // Faster when deleting
    } else if (currentIndex === 0 && !isDeleting) {
      currentSpeed = speed; // No initial delay, start typing immediately
    }

    timeoutRef.current = setTimeout(type, currentSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isDeleting, isCompleted, text, speed, delay]);

  // Function to manually restart the typewriter
  const restart = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayText("");
    setCurrentIndex(0);
    setIsDeleting(false);
    setIsCompleted(false);
  }, []);

  return {
    displayText,
    isCompleted,
    isDeleting,
    restart,
  };
};

export default useTypewriter;
