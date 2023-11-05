
import datas from './data.json'; // adjust the path to match your JSON file location
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import React, { useState } from 'react';

const PieChartComponent = () => {
  
  
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(Number(datas.gmi) ? parseInt(datas.gmi, 10) : 0);
const [creditCardPayment, setCreditCardPayment] = useState(Number(datas.credit_card_p) ? parseInt(datas.credit_card_p, 10) : 0);
const [carPayment, setCarPayment] = useState(Number(datas.car_p) ? parseInt(datas.car_p, 10) : 0);
const [studentLoanPayments, setStudentLoanPayments] = useState(Number(datas.slp) ? parseInt(datas.slp, 10) : 0);
const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState(Number(datas.monthly_mortgage_a) ? parseInt(datas.monthly_mortgage_a, 10) : 0);
const [savedIncome, setSavedIncome] = useState(grossMonthlyIncome - (carPayment + creditCardPayment + monthlyMortgagePayment + studentLoanPayments));
const [loanAmount, setLoanAmount] = useState(Number(datas.loan_a) ? parseInt(datas.loan_a, 10) : 0);
  const [downPayment, setDownPayment] = useState(Number(datas.down_p) ? parseInt(datas.down_p, 10) : 0);
  const appraisedValue = loanAmount + downPayment;
console.log(loanAmount);

const suggestion = datas.suggestions; 
  const handleSliceChange = (setSliceValue, event) => {
    setSliceValue(Number(event.target.value));
    const updatedSavedIncome = grossMonthlyIncome - (carPayment + creditCardPayment + monthlyMortgagePayment + studentLoanPayments);
    setSavedIncome(updatedSavedIncome);
  };
  
  
  // Calculate the DTI value
  const dti = (100 * (creditCardPayment + carPayment + studentLoanPayments + monthlyMortgagePayment) / grossMonthlyIncome) ;
  const fedti = (100 * (monthlyMortgagePayment) / grossMonthlyIncome) ;
  

const Slider = ({ label, min, max, value, onChange, color }) => (
  <label>
    {label}
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      style={{ background: color }}
    />
  </label>
);


const data = [
  { name: 'Credit Card Payment', value: creditCardPayment },
  { name: 'Car Payment', value: carPayment},
  { name: 'Student Loan Payments', value: studentLoanPayments},
  { name: 'Monthly Mortgage Payment', value: monthlyMortgagePayment},
  { name: 'Saved Income', value: savedIncome}
];
// LTV 
  
  const ltv = (100 * (appraisedValue - downPayment) / appraisedValue);

  const data2 = [
    { name: 'Loan amount', value: loanAmount },
    { name: 'Down Payment', value: downPayment}
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
    <div>
      <h2>DTI (Debt-to-Income Ratio)</h2>
      <h1>{dti.toFixed(2)}%</h1>
      {dti > 36 ? <h2>Decrease by {(dti - 36).toFixed(2)}% is needed </h2> : <h1>you are good to go</h1>}
      <h2>FeDTI (fe Debt-to-Income Ratio)</h2>
      <h1>{fedti.toFixed(2)}%</h1>
      {fedti > 28 ? <h2>Decrease by {(fedti - 28).toFixed(2)}% is needed </h2> : <h1>you are good to go</h1>}


      <label>
  Credit Card Payment
  <input type="range" min = "0"  max={parseInt(datas.credit_card_p)} value={creditCardPayment} onChange={event => handleSliceChange(setCreditCardPayment, event)} />
</label>
<label>
  Car Payment
  <input type="range" min="0" max={parseInt(datas.car_p)} value={carPayment} onChange={event => handleSliceChange(setCarPayment, event)} />
</label>
<label>
  Student Loan Payments
  <input type="range" min="0" max={parseInt(datas.slp)} value={studentLoanPayments} onChange={event => handleSliceChange(setStudentLoanPayments, event)} />
</label>
<label>
  Monthly Mortgage Payment
  <input type="range" min="0" max={parseInt(datas.monthly_mortgage_a)} value={monthlyMortgagePayment} onChange={event => handleSliceChange(setMonthlyMortgagePayment, event)} />
</label>
<label>
  Saved Income
  <input type="range" min="0" max={grossMonthlyIncome} value={savedIncome} onChange={event => handleSliceChange(setSavedIncome, event)} />
</label>

      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
      </PieChart>

      <h2>Gross Monthly Income</h2>
      <p>{grossMonthlyIncome}</p>
    </div>
    <div>
      <h2>LTV (Loan-to-Value Ratio)</h2>
      <h1>{ltv.toFixed(2)}%</h1>
      {ltv > 80 ? <h2>Decrease by {(ltv - 80).toFixed(2)}% is needed </h2> : <h1>you are good to go</h1>}


      <label>
Loan Amount  <input type="range" min = "0"  max={appraisedValue} value={loanAmount} onChange={event => handleSliceChange(setLoanAmount, event)} />
</label>
<label>
Down Payment  <input type="range" min="0" max={appraisedValue} value={downPayment} onChange={event => handleSliceChange(setDownPayment, event)} />
</label>

      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data2}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
>
          {
            data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
      </PieChart>

      <h2>Appraised Value</h2>
      <h3>{appraisedValue}</h3>
      <h2>Suggestion</h2>
      <h4>{suggestion}</h4>
    </div>
    </div>
  );
  
};


export default PieChartComponent;