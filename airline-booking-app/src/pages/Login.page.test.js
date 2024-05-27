import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./Login.page";
import { authentication } from "../apis/authentication.api";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));
jest.mock("../apis/authentication.api", () => ({
  authentication: jest.fn(),
}));

jest.mock("../contexts/User.context", () => ({
  useUser: () => ({
    login: jest.fn(),
  }),
}));

test("renders correctly", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  const email = screen.getByTestId("email");
  const password = screen.getByTestId("password");
  const loginButton = screen.getByRole("button", { name: "Sign in" });

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("allows the user to enter email and password", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");

  fireEvent.change(emailInput, { target: { value: "user@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  expect(emailInput.value).toBe("user@example.com");
  expect(passwordInput.value).toBe("password123");
});

test("submits the form with email and password", async () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  authentication.mockResolvedValue({
    data: { user: { name: "John Doe" } },
  });

  fireEvent.change(screen.getByTestId("email"), {
    target: { value: "user@example.com" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByText("Sign in"));

  await waitFor(() => {
    expect(authentication).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123",
    });
  });
});

