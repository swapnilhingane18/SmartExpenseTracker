import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, deleteExpense }) {
  if (expenses.length === 0) {
    return <p>No expenses added yet.</p>;
  }

  return (
    <table border="1" cellPadding="8">
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
          />
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;
