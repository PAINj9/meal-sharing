import { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import "./MealsList.css";

function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/meals")
      .then((res) => res.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error("Error fetching meals:", error));
  }, []);

  if (meals.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Meals</h2>
      <div className="meals-grid">
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default MealsList;
