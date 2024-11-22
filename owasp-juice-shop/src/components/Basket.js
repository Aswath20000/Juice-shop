import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchBasket = async () => {
      if (!username) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/basket/${username}`);
        setBasketItems(response.data.items || []);
      } catch (error) {
        console.error('Error fetching basket:', error);
      }
    };

    fetchBasket();
  }, [username]);

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h2>Your Basket</h2>
      {basketItems.length === 0 ? (
        <p>Your basket is empty!</p>
      ) : (
        <ul>
          {basketItems.map((item, index) => (
            <li key={index}>
              <img src={`/${item.image}`} alt={item.name} style={{ width: '50px', height: '50px' }} />
              {item.name} - {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Basket;
