import React from 'react';
import logo from './logo.svg';
import './dashboard.css';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../util/auth';
import Navbar from '../ui/navbar';

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
  const [fastClickMsg, setFastClickMsg] = useState<string | null>(null);

  // data analysis states
  const [n, setN] = useState<number | null>(null); // State to hold n value
  const [mean, setMean] = useState<number | null>(null); // State to hold mean value
  const [median, setMedian] = useState<number | null>(null); // State to hold median value
  const [stdDev, setStdDev] = useState<number | null>(null); // State to hold standard deviation value
  const [variance, setVariance] = useState<number | null>(null); // State to hold variance value
  const [min, setMin] = useState<number | null>(null); // State to hold minimum value
  const [max, setMax] = useState<number | null>(null); // State to hold maximum value
  
  // Ref to store timestamp of last plus/minus action
  const lastActionRef = useRef<number>(0);


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

 // Throttle helper
  const throttleAction = async (endpoint: 'plus-one' | 'minus-one') => {
    const now = Date.now();
    if (now - lastActionRef.current < 5000) {
      setFastClickMsg('Please wait 5 seconds before updating again.');
      setTimeout(() => setFastClickMsg(null), 3000);
      return;
    }
    lastActionRef.current = now;
    setFastClickMsg(null);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ auth_token: token, email }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Update failed');
      }
      const data = await res.json();
      setCount(data.count);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handlePlusOne = () => throttleAction('plus-one');
  const handleMinusOne = () => throttleAction('minus-one');

  if (loading) {
    return <div className="status-overlay loading">Loading…</div>;
  }

  if (error) {
    return <div className="status-overlay error-message">Error: {error}</div>;
  }
  
  return (
    <div className="dashboard">
      <Navbar />
      <h2>Welcome, {userData?.email}</h2>
      {fastClickMsg && (
        <div className="fast-click-message">{fastClickMsg}</div>
      )}
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