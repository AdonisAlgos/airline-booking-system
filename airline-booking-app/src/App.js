import "./App.css";
import RegisterPage from "./pages/Register.page";
import LoginPage from "./pages/Login.page";
import HomePage from "./pages/Home.page";
import ErrorPage from "./pages/Error.page";
import LayoutPage from "./pages/Layout.page";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/User.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
