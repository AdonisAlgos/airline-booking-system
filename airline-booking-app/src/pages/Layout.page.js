import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import Footer from "../components/Footer.component";

const LayoutPage = () => {
  return (
    <div style={{ minheight: "100vh", backgroundColor: "rgb(251, 251, 251)" }}>
      <div
        className="fixed-top border-bottom"
        style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Navbar />
      </div>
      <section
        className="d-flex"
        style={{
          marginTop: "57px",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </section>
      <div
        className="border-top"
        style={{
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default LayoutPage;
