"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";

const NotFoundAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    // For 404 pages, we don't need search params, just track the pathname
    if (typeof window === "undefined") return;

    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      ReactGA.send({
        hitType: "pageview",
        page: pathname,
        title: document.title,
      });
    }
  }, [pathname]);

  // Don't render analytics during SSR
  if (typeof window === "undefined") {
    return null;
  }

  return <Analytics />;
};

export default NotFoundAnalytics;
