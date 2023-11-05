import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [monthlyPayment, setMonthlyPayment] = useState(1000);
  const [data, setData] = useState([]);

  const calculateSavings = (monthlyPayment) => {
    const interestRate = 0.05;
    const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const savingsData = years.map(year => {
      const months = year * 12;
      let balance = 0;
      for (let i = 0; i < months; i++) {
        balance += monthlyPayment;
        balance *= (1 + interestRate / 12);
      }
      const savings = balance - (monthlyPayment * months);
      return { year, savings };
    });
    setData(savingsData);
  }

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setMonthlyPayment(value);
    calculateSavings(value);
  }

  useEffect(() => {
    calculateSavings(monthlyPayment);
  }, [monthlyPayment]);

  return (
    <div>
      <h1>Money Saved Over Time</h1>
      <p>Monthly Payment: ${monthlyPayment}</p>
      <input type="range" min="0" max="10000" value={monthlyPayment} onChange={handleSliderChange} />
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="savings" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default App;