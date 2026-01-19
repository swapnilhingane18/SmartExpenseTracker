import { useState } from "react";

function ExpenseForm({ addExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !date) {
      alert("Amount and Date are required");
      return;
    }

    const expense = {
      id: Date.now(),
      amount,
      category,
      note,
      date,
    };

    // Send data to App.jsx
    addExpense(expense);

    // Clear form
    setAmount("");
    setCategory("Food");
    setNote("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
