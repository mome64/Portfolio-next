"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";

const AnalyticsWrapper = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    // Skip analytics tracking during SSR or if searchParams is not available
    if (typeof window === "undefined" || !searchParams) return;

    const url =
      pathname + (searchParams.toString() ? "?" + searchParams.toString() : "");

    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      ReactGA.send({
        hitType: "pageview",
        page: url,
        title: document.title,
      });
    }
  }, [pathname, searchParams]);

  // Don't render analytics during SSR
  if (typeof window === "undefined") {
    return null;
  }

  return <Analytics />;
};

export default AnalyticsWrapper;
