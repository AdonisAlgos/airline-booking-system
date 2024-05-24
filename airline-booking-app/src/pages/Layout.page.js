import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import Footer from "../components/Footer.component";

const LayoutPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      {" "}
      <Navbar />
      <section
        className="d-flex"
        style={{
          marginTop: "56px",
          padding: "2rem",
          minHeight: "calc(100vh - 56px - 6rem)",
        }}
      >
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default LayoutPage;
