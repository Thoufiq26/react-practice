import React, { useState } from "react";

const ExpenseTracker = () => {
  const [budget, setBudget] = useState(0);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleAddBudget = () => {
    if (!budget) return;
    setBudget(Number(budget));
  };

  const handleAddExpense = () => {
    if (!title || !amount) return;
    const newExpense = { title, amount: parseFloat(amount) };
    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };

  const handleRemove = (index) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
  };

  const handleReset = () => {
    setExpenses([]);
    setBudget(0);
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const budgetLeft = budget - totalExpenses;

  return (
    <div className="tracker-container">
      <h1>Expense Tracker</h1>

      <div className="form-section">
        <div className="form-group">
          <h2>Add Budget</h2>
          <input
            type="number"
            placeholder="Enter Budget"
            onChange={(e) => setBudget(e.target.value)}
          />
          <button onClick={handleAddBudget}>Set Budget</button>
        </div>

        <div className="form-group"> 
          <h2>Add Expense</h2>
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleAddExpense}>Add Expense</button>
        </div>
      </div>

      <div className="summary">
        <div>
          <h3>Total Budget</h3>
          <p>₹{budget}</p>
        </div>
        <div>
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses}</p>
        </div>
        <div>
          <h3>Budget Left</h3>
          <p>₹{budgetLeft}</p>
        </div>
      </div>

      <h2>Expense History</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty-text">No expenses added yet.</td>
            </tr>
          ) : (
            expenses.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>₹{item.amount}</td>
                <td>
                  <button onClick={() => handleRemove(index)}>Remove</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button className="reset-button" onClick={handleReset}>Reset All</button>
    </div>
  );
};

export default ExpenseTracker;
