import { useState } from "react";

function ReviewForm({ mealId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      title,
      description,
      stars,
      meal_id: mealId,
    };

    // Hacer el POST a la API de reseñas
    fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => {
        if (res.ok) {
          alert("Review submitted successfully!");
          setTitle("");
          setDescription("");
          setStars(1);
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.error("Error submitting review:", err));
  };

  return (
    <div>
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          name="stars"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;
