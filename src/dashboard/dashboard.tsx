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

  // data analysis states
  const [n, setN] = useState<number | null>(null); // State to hold n value
  const [mean, setMean] = useState<number | null>(null); // State to hold mean value
  const [median, setMedian] = useState<number | null>(null); // State to hold median value
  const [stdDev, setStdDev] = useState<number | null>(null); // State to hold standard deviation value
  const [variance, setVariance] = useState<number | null>(null); // State to hold variance value
  const [min, setMin] = useState<number | null>(null); // State to hold minimum value
  const [max, setMax] = useState<number | null>(null); // State to hold maximum value
  

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

useEffect(() => {
  // define the fetch function once
  const fetchDataAnalysis = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/data-analysis`,
        { method: 'GET' }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error || 'Failed to fetch data analysis');
      }

      const data = await response.json();
      setN(data?.n);
      setMean(data?.mean);
      setMedian(data?.median);
      setStdDev(data?.std_dev);
      setVariance(data?.variance);
      setMin(data?.min);
      setMax(data?.max);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // initial fetch
  fetchDataAnalysis();

  // then poll every 5 seconds
  const intervalId = setInterval(fetchDataAnalysis, 5000);

  // cleanup on unmount
  return () => clearInterval(intervalId);
}, []); // run only once on mount

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
    <div className="dashboard">
      <h2>Welcome, {userData?.email}</h2>
      <div className="count-controls">
        <button onClick={handleMinusOne}>–</button>
        <span className="count">{count}</span>
        <button onClick={handlePlusOne}>+</button>
      </div>

      <h3>Data Across All Users</h3>
      <table className="analysis-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sample Size (n)</td>
            <td>{n ?? '—'}</td>
          </tr>
          <tr>
            <td>Mean</td>
            <td>{mean ?? '—'}</td>
          </tr>
          <tr>
            <td>Median</td>
            <td>{median ?? '—'}</td>
          </tr>
          <tr>
            <td>Std. Deviation</td>
            <td>{stdDev ?? '—'}</td>
          </tr>
          <tr>
            <td>Variance</td>
            <td>{variance ?? '—'}</td>
          </tr>
          <tr>
            <td>Min</td>
            <td>{min ?? '—'}</td>
          </tr>
          <tr>
            <td>Max</td>
            <td>{max ?? '—'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;