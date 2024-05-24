import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../apis/registration.api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    streetAddress: "",
    city: "",
    postcode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      registration(formData);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Login failed, please try again later.");
    }
  };

  return (
    <div className="flex: 1 container d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <h3 className="text-center mb-4">Registration</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                data-testid="name"
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                data-testid="last name"
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                data-testid="email"
                type="text"
                className="form-control"
                name="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                data-testid="password"
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Street Address</label>
              <input
                data-testid="street"
                type="text"
                className="form-control"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>City</label>
              <input
                data-testid="city"
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Postcode</label>
              <input
                data-testid="postcode"
                type="text"
                className="form-control"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
              />
            </div>
            <small id="reg" className="form-text text-muted">
              <Link to="/login">Already have an account? Try logging in!</Link>
            </small>
            <div className="d-flex justify-content-center pt-3">
              <button className="btn btn-primary w-100">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
