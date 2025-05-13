import React from 'react';
import logo from './logo.svg';
import './dashboard.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../util/auth';

interface UserData {
  email: string;
  count: number;
}

function Dashboard() {
  const { token, email } = useAuth();
  const [count, setCount] = useState(null);
  const [userData, setUserData] = useState<UserData | null>(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    // Only attempt to fetch if both token and email are available.
    if (!token || !email) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/read`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ auth_token: token, email: email }), 
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData)
          throw new Error(errorData.error || 'Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setCount(data?.count);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  // Function to handle updating the count by calling the /plus-one endpoint
  const handlePlusOne = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/plus-one`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_token: token, email: email }), 
      });

      if (!response.ok) {
        // If response is not ok, throw an error with status
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData.error || 'Failed to update count');
      }

      const data = await response.json();
      setCount(data.count); // Update the count state with the new value
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Function to handle updating the count by calling the /minus-one endpoint
  const handleMinusOne = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/minus-one`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_token: token, email: email }), 
      });

      if (!response.ok) {
        // If response is not ok, throw an error with status
        const errorData = await response.json();
        console.log(errorData)
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
    return <div>Error: {error}</div>;
  }
  
  return (
    <div> 
      <p>{userData?.email}</p>
      <p>{count}</p>
      <button onClick={handlePlusOne}>The Game (+)</button>
      <button onClick={handleMinusOne}>The Game (-)</button>
    </div>
  );
}

export default Dashboard;