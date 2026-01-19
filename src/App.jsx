import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  /* ---------------- CRUD ---------------- */
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    );
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  /* ---------------- FILTER ---------------- */
  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory);

  /* ---------------- TOTAL ---------------- */
  const totalExpense = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  /* ---------------- MONTHLY SUMMARY ---------------- */
  const monthlySummary = expenses.reduce((acc, e) => {
    const month = e.date.slice(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + Number(e.amount);
    return acc;
  }, {});

  /* ---------------- CSV EXPORT ---------------- */
  const exportToCSV = () => {
    if (expenses.length === 0) {
      alert("No expenses to export");
      return;
    }

    const headers = ["Date", "Category", "Note", "Amount"];
    const rows = expenses.map((e) => [
      e.date,
      e.category,
      e.note,
      e.amount,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "expenses.csv";
    link.click();
  };

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <ExpenseForm
        addExpense={addExpense}
        editingExpense={editingExpense}
        updateExpense={updateExpense}
      />

      {/* CATEGORY FILTER */}
      <div className="filter">
        <label>Filter by Category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option>All</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>
      </div>

      <h2 className="total">Total Expense: ₹ {totalExpense}</h2>

      {/* CSV EXPORT BUTTON */}
      <button onClick={exportToCSV} className="export-btn">
        Export to CSV
      </button>

      <ExpenseList
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
        onEdit={setEditingExpense}
      />

      {/* MONTHLY SUMMARY */}
      <h2>Monthly Summary</h2>
      <ul className="monthly-summary">
        {Object.entries(monthlySummary).map(([month, amount]) => (
          <li key={month}>
            {month} : ₹ {amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
