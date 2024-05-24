import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import Footer from "../components/Footer.component";

const LayoutPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="fixed-top border-bottom">
        <Navbar />
      </div>
      <section
        className="d-flex"
        style={{
          marginTop: "57px",
          minHeight: "calc(100% - 57px)",
        }}
      >
        <Outlet />
      </section>
      <div className="border-top">
        <Footer />
      </div>
    </div>
  );
};

export default LayoutPage;
