import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function UseScrollToTop() {
  //here to get rid of the scroll location so each page starts from the top when navigating
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
