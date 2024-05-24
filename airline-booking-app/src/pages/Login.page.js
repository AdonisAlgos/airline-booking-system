import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User.context";
import { authentication } from "../apis/authentication.api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await authentication({
        email,
        password,
      });

      login(response.data.user);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed, please try again later.");
    }
  };

  return (
    <div className="flex: 1 container d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
          <h3 className="text-center mb-4">Welcome</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                data-testid="email"
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                data-testid="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <small id="reg" className="form-text text-muted">
              <Link to="/register">Don't have an account? Sign up!</Link>
            </small>
            <div className="d-flex justify-content-center pt-3">
              <button className="btn btn-primary w-100">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
