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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  /* CRUD */
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const updateExpense = (updated) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  /* FILTER + SORT */
  const filteredExpenses = expenses.filter((e) => {
    const catOk = filterCategory === "All" || e.category === filterCategory;
    const startOk = !startDate || new Date(e.date) >= new Date(startDate);
    const endOk = !endDate || new Date(e.date) <= new Date(endDate);
    return catOk && startOk && endOk;
  });

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  /* TOTAL */
  const totalExpense = sortedExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  /* MONTHLY SUMMARY */
  const monthlySummary = expenses.reduce((acc, e) => {
    const month = e.date.slice(0, 7);
    acc[month] = (acc[month] || 0) + Number(e.amount);
    return acc;
  }, {});

  /* CATEGORY SUMMARY */
  const categorySummary = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  /* CSV */
  const exportToCSV = () => {
    if (!expenses.length) return alert("No expenses to export");

    const rows = [
      ["Date", "Category", "Note", "Amount"],
      ...expenses.map((e) => [e.date, e.category, e.note, e.amount]),
    ];

    const csv =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "expenses.csv";
    link.click();
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>Expense Tracker</h1>

      <ExpenseForm
        addExpense={addExpense}
        editingExpense={editingExpense}
        updateExpense={updateExpense}
      />

      <div className="filters">
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

        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <h2 className="total">Total Expense: ₹ {totalExpense}</h2>

      <button className="export-btn" onClick={exportToCSV}>
        Export to CSV
      </button>

      <ExpenseList
        expenses={sortedExpenses}
        deleteExpense={deleteExpense}
        onEdit={setEditingExpense}
      />

      <MonthlyChart summary={monthlySummary} />
      <CategoryPieChart data={categorySummary} />
    </div>
  );
}

export default App;
