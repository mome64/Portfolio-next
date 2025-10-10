import NotFoundAnalytics from "./NotFoundAnalytics";

export default function NotFoundLayout({ children }) {
  return (
    <>
      {children}
      <NotFoundAnalytics />
    </>
  );
}
