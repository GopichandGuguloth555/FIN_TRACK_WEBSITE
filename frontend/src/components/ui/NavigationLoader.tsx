import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";

export default function NavigationLoader() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setIsNavigating(true);
      setPrevPath(location.pathname);
      const timer = setTimeout(() => setIsNavigating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath]);

  if (!isNavigating) return null;

  return <PageLoader />;
}
