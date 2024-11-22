import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/feedback', { feedback });
      setMessage(response.data.message || 'Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Error submitting feedback!');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="Your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Feedback;
