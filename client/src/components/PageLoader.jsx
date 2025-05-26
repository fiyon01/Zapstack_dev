import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageLoader = () => {
  const location = useLocation();
  const [showPageLoader, setShowPageLoader] = useState(false);

  useEffect(() => {
    setShowPageLoader(true);

    // Simulate a delay like data fetching
    const timeout = setTimeout(() => {
      setShowPageLoader(false);
    }, 1000); // adjust as needed

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    showPageLoader && (
      <div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pageLoader"></div>
      </div>
    )
  );
};

export default PageLoader;
