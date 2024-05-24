import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-muted">
            © 2024 Aireal Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <Link className="text-muted">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
