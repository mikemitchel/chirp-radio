// src/layouts/RootLayout.tsx
import React from "react";
import CrAppHeader from "../stories/CrAppHeader";
import CrFooter from "../stories/CrFooter";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CrAppHeader />
      <main>{children}</main>
      <CrFooter />
    </>
  );
};
