import React, { useEffect, useState } from "react";
import { DesktopDashboard } from "../pages/Dashboard/DesktopDashboard";
import { TabletDashboard } from "../pages/Dashboard/TabletDashboard";
// import { MobileDashboard } from "../screens/MobileDashboard/MobileDashboard";
import { MobileDashboard } from "../pages/Dashboard/MobileDashboard";
const DashboardLayout = () => {
  const [screenSize, setScreenSize] = useState("desktop");

  // ✅ Detect screen width and update layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreenSize("mobile");
      } else if (width >= 768 && width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize(); // initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Render correct layout
  return (
    <>
      {screenSize === "mobile" && <MobileDashboard />}
      {screenSize === "tablet" && <TabletDashboard />}
      {screenSize === "desktop" && <DesktopDashboard />}
    </>
  );
};

export default DashboardLayout;
