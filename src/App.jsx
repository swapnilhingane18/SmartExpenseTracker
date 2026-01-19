import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import MonthlyChart from "./MonthlyChart";
import CategoryPieChart from "./CategoryPieChart";
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

  /* ---------------- FILTER & SORT ---------------- */
  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory);

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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

  /* ---------------- CATEGORY SUMMARY (FOR PIE CHART) ---------------- */
  const categorySummary = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
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

  /* ---------------- UI ---------------- */
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

      <button onClick={exportToCSV} className="export-btn">
        Export to CSV
      </button>

      <ExpenseList
        expenses={sortedExpenses}
        deleteExpense={deleteExpense}
        onEdit={setEditingExpense}
      />

      {/* MONTHLY BAR CHART */}
      <MonthlyChart summary={monthlySummary} />

      {/* MONTHLY SUMMARY LIST */}
      <h2>Monthly Summary</h2>
      <ul className="monthly-summary">
        {Object.entries(monthlySummary).map(([month, amount]) => (
          <li key={month}>
            {month} : ₹ {amount}
          </li>
        ))}
      </ul>

      {/* CATEGORY PIE CHART */}
      <CategoryPieChart data={categorySummary} />
    </div>
  );
}

export default App;
