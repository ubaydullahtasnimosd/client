import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigationType } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const AppLayout = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.search, navigationType]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
