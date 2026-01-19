import { useEffect, useState } from "react";

export default function ExpenseForm({
  addExpense,
  editingExpense,
  updateExpense,
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  /* Prefill form when editing */
  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setNote(editingExpense.note || "");
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !date) return;

    const expense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      amount: Number(amount),
      category,
      note,
      date,
    };

    editingExpense ? updateExpense(expense) : addExpense(expense);

    /* Reset form */
    setAmount("");
    setCategory("Food");
    setNote("");
    setDate("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        required
        min="1"
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
        required
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        type="submit"
        className={editingExpense ? "edit-btn" : "add-btn"}
      >
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}
