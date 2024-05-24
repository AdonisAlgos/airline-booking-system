import React from "react";
import "./Error.page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex-column flex: 1 container d-flex align-items-center justify-content-center error-page">
      <h1
        className="text-center"
        style={{ fontFamily: "'Pacifico', cursive", fontSize: "24px" }}
      >
        Oops! Something went wrong.
      </h1>
      <p className="text-center" style={{ margin: "20px" }}>
        We couldn't cook up the page you were looking for.
      </p>
      <Link
        to="/"
        className="btn btn-primary d-flex align-items-center justify-content-center"
      >
        <FontAwesomeIcon icon={faHome} />
        <span style={{ marginLeft: "10px" }}>Take Me Home</span>
      </Link>
    </div>
  );
};

export default ErrorPage;
