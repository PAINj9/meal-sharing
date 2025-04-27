function Meal({ meal }) {
    return (
      <div className="meal-card">
        <h3>{meal.name}</h3>
        {meal.description && <p>{meal.description}</p>}
        <p>Price: ${meal.price}</p>
      </div>
    );
  }
  
  export default Meal;
  