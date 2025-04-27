import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    title: "",
    description: "",
    stars: 1,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/meals/${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data))
      .catch((err) => console.error("Error fetching meal:", err));

    // Fetching reviews for the meal
    fetch(`http://localhost:3000/api/reviews/${id}`) // Cambié la URL aquí
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      title: newReview.title,
      description: newReview.description,
      stars: newReview.stars,
      meal_id: id,
    };

    fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews([...reviews, data]); // Añadir la nueva reseña al estado
        setNewReview({ title: "", description: "", stars: 1 }); // Resetear el formulario
      })
      .catch((err) => console.error("Error submitting review:", err));
  };

  if (!meal) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{meal.name}</h2>
      <p>Price: ${meal.price}</p>

      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <h4>{review.title}</h4>
            <p>{review.description}</p>
            <p>Rating: {review.stars} stars</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      <h3>Leave a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Review title"
          value={newReview.title}
          onChange={handleReviewChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newReview.description}
          onChange={handleReviewChange}
          required
        />
        <input
          type="number"
          name="stars"
          min="1"
          max="5"
          value={newReview.stars}
          onChange={handleReviewChange}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default MealDetails;
