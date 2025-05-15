"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if viewport width is below a breakpoint
 * @param breakpoint - Width breakpoint in pixels (default: 576)
 * @returns boolean indicating if viewport is below breakpoint
 */
const useIsMobile = (breakpoint: number = 576): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
