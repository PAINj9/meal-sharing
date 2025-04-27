import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/meals")
      .then((res) => res.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error("Error fetching meals:", error));
  }, []);

  if (meals.length === 0) {
    return <p>Loading meals...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Meals</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {meals.map((meal) => (
          <div key={meal.id} style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
          }}>
            <h3>{meal.name}</h3>
            <p><strong>Price:</strong> ${meal.price}</p>
            <Link to={`/meals/${meal.id}`} style={{
              textDecoration: "none",
              color: "#007bff",
              marginTop: "10px",
              display: "inline-block"
            }}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealsList;