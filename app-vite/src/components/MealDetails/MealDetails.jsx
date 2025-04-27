import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/meals/${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data))
      .catch((err) => console.error("Error fetching meal:", err));

    fetch(`http://localhost:3000/api/meals/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);

  if (!meal) {
    return <p>Loading meal details...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <h2>{meal.name}</h2>
        <p><strong>Price:</strong> ${meal.price}</p>

        <h3 style={{ marginTop: "30px" }}>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} style={{
              backgroundColor: "#f9f9f9",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "8px"
            }}>
              <h4>{review.title}</h4>
              <p>{review.description}</p>
              <p><strong>Stars:</strong> {review.stars}⭐</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default MealDetails;cd /Users/painj9/Documents/GitHub/meal-sharing/frontend