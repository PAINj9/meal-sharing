import React from "react";
import "./HomePage.css";

import MealsList from "../MealsList/MealsList";

function HomePage() {
  return (
    <div>
      <h1>Welcome to Meal Sharing</h1>
      <MealsList />
    </div>
  );
}

export default HomePage;
