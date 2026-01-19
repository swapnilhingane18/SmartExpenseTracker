import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, deleteExpense, onEdit }) {
  if (expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Note</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={deleteExpense}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;
