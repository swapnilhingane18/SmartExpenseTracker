import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      {/* Pass function as prop */}
      <ExpenseForm addExpense={addExpense} />

      <h2>Expenses Count: {expenses.length}</h2>
    </div>
  );
}

export default App;
