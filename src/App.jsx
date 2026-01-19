import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm addExpense={addExpense} />

      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
      />
    </div>
  );
}

export default App;
