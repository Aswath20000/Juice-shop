import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// Function to generate MD5 hash for validation
const generateMD5Hash = (day, month, discount) => {
  const couponString = `${day}-${month}-${discount}`;
  const hash = CryptoJS.MD5(couponString).toString(CryptoJS.enc.Hex); // Ensure it's Hex
  return hash;
};

const Offers = () => {
  const [userInput, setUserInput] = useState(''); // User-entered coupon code
  const [isValid, setIsValid] = useState(false); // Validity status
  const [discount, setDiscount] = useState(null); // Discount percentage if valid

  // Hardcoded example coupon details for validation
  const day = String(new Date().getDate()).padStart(2, '0'); // Current day
  const month = String(new Date().getMonth() + 1).padStart(2, '0'); // Current month
  const validDiscounts = [10, 20, 30, 40, 50]; // Example discounts

  // Generate valid coupons for comparison
  const validCoupons = validDiscounts.map((discount) => generateMD5Hash(day, month, discount));

  // Validate the user input
  const validateCoupon = () => {
    const trimmedInput = userInput.trim(); // Remove leading/trailing spaces
    console.log("User input hash:", trimmedInput);

    const matchedIndex = validCoupons.findIndex(
      (validCoupon) => validCoupon === trimmedInput
    );
    
    if (matchedIndex !== -1) {
      setIsValid(true);
      setDiscount(validDiscounts[matchedIndex]);
    } else {
      setIsValid(false);
      setDiscount(null);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Exclusive Offers</h2>
      <p style={{ fontSize: '16px', color: '#555' }}>Enter your coupon code to redeem your discount:</p>
      <input
        type="text"
        placeholder="Enter coupon code"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
        }}
      />
      <button
        onClick={validateCoupon}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Validate
      </button>

      {/* Feedback Section */}
      {isValid && discount && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e6f9e6',
            border: '1px solid #4CAF50',
            borderRadius: '4px',
            color: '#4CAF50',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          🎉 Your coupon is valid! You get a {discount}% discount!
        </div>
      )}
      {!isValid && userInput && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#fde6e6',
            border: '1px solid #f44336',
            borderRadius: '4px',
            color: '#f44336',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          ❌ Invalid Coupon. Please try again.
        </div>
      )}
    </div>
  );
};

export default Offers;
