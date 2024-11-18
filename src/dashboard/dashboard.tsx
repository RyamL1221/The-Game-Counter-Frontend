import React from 'react';
import logo from './logo.svg';
import './dashboard.css';
import { useState, useEffect } from 'react';


function Dashboard() {
  const [count, setCount] = useState(null); // State to hold the count
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Define an async function to fetch the count
    const fetchCount = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get-count`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // If response is not ok, throw an error with status
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch count');
        }

        const data = await response.json();
        setCount(data.count);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch is done
      }
    };

    fetchCount(); // Call the async function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to handle updating the count by calling the /plus-one endpoint
  const handlePlusOne = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/plus-one`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: 0 }), // Adjust based on backend requirements
      });

      if (!response.ok) {
        // If response is not ok, throw an error with status
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update count');
      }

      const data = await response.json();
      setCount(data.count); // Update the count state with the new value
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Function to handle updating the count by calling the /plus-one endpoint
  const handleMinusOne = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/minus-one`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: 0 }),
      });

      if (!response.ok) {
        // If response is not ok, throw an error with status
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update count');
      }

      const data = await response.json();
      setCount(data.count); // Update the count state with the new value
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading count...</div>;
  }

  if (error) {
    return <div>Error fetching count: {error}</div>;
  }
  
  return (
    <div> 
      <button onClick={handlePlusOne}>The Game (+)</button>
      <button onClick={handleMinusOne}>The Game (-)</button>
      <p>{count}</p>
    </div>
  );
}

export default Dashboard;
