import React from "react";

const Footer = () => {
  const FullYear = new Date().getFullYear();
  return (
    <footer className="mt-10 flex h-16 w-full items-center justify-center border-t">
      © {FullYear} Tailwindkits. All rights reserved. | Privacy Policy
    </footer>
  );
};

export default Footer;
