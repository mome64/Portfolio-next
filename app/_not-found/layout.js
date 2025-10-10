import { Suspense } from "react";
import AnalyticsWrapper from "../components/Analytics";

export default function NotFoundLayout({ children }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <AnalyticsWrapper />
      </Suspense>
    </>
  );
}
