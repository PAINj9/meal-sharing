import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import MealDetails from "./components/MealDetails/MealDetails.jsx"; 
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/nested",
    element: <TestPage />,
  },
  {
    path: "/meals/:id", 
    element: <MealDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
