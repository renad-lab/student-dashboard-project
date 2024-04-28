// Form.js
import React, { useState } from "react";

function Form() {
  const [comment, setComment] = useState("");
  // Add more state variables for commenter name, etc.

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    // Clear form fields
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add comment..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
