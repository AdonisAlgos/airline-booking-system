import RegisterPage from "./Register.page";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("renders register page", () => {
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );

  const customerName = screen.getByTestId("name");
  const customerLastName = screen.getByTestId("last name");
  const email = screen.getByTestId("email");
  const password = screen.getByTestId("password");
  const street = screen.getByTestId("street");
  const city = screen.getByTestId("city");
  const postcode = screen.getByTestId("postcode");
  const loginButton = screen.getByRole("button", { name: "Sign Up" });

  expect(customerName).toBeInTheDocument();
  expect(customerLastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(street).toBeInTheDocument();
  expect(city).toBeInTheDocument();
  expect(postcode).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("test form value change when user is typing", () => {
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );

  const nameInput = screen.getByTestId("name");
  const lastNameInput = screen.getByTestId("last name");
  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");
  const streetInput = screen.getByTestId("street");
  const cityInput = screen.getByTestId("city");
  const postcodeInput = screen.getByTestId("postcode");

  fireEvent.change(nameInput, { target: { value: "Test" } });
  fireEvent.change(lastNameInput, { target: { value: "Test" } });
  fireEvent.change(passwordInput, { target: { value: "test" } });
  fireEvent.change(emailInput, { target: { value: "test@email.com" } });
  fireEvent.change(streetInput, { target: { value: "Test" } });
  fireEvent.change(cityInput, { target: { value: "Test" } });
  fireEvent.change(postcodeInput, { target: { value: "Test" } });

  expect(nameInput.value).toBe("Test");
  expect(lastNameInput.value).toBe("Test");
  expect(emailInput.value).toBe("test@email.com");
  expect(passwordInput.value).toBe("test");
  expect(streetInput.value).toBe("Test");
  expect(cityInput.value).toBe("Test");
  expect(postcodeInput.value).toBe("Test");
});
