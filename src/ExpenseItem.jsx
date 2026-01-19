function ExpenseItem({ expense, onDelete }) {
  return (
    <tr>
      <td>{expense.date}</td>
      <td>{expense.category}</td>
      <td>{expense.note || "-"}</td>
      <td>₹ {expense.amount}</td>
      <td>
        <button onClick={() => onDelete(expense.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
