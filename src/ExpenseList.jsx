export default function ExpenseList({ expenses, deleteExpense, onEdit }) {
  if (expenses.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px", color: "#6b7280" }}>
        No expenses found.
      </p>
    );
  }

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Note</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((e) => (
          <tr key={e.id}>
            <td>{e.date}</td>
            <td>
              <span className={`category-badge ${e.category.toLowerCase()}`}>
                {e.category}
              </span>
            </td>
            <td>{e.note || "-"}</td>
            <td>₹ {e.amount}</td>
            <td className="action-buttons">
              <button
                className="edit-btn"
                onClick={() => onEdit(e)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteExpense(e.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
