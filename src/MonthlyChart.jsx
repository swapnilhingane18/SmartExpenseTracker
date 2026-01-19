export default function MonthlyChart({ summary }) {
  const entries = Object.entries(summary);

  if (entries.length === 0) {
    return <p>No monthly data available.</p>;
  }

  const maxAmount = Math.max(...entries.map(([, amount]) => amount));

  return (
    <div className="chart-container">
      <h2>Monthly Expense Chart</h2>

      {entries.map(([month, amount]) => (
        <div key={month} className="bar-row">
          <span className="bar-label">{month}</span>

          <div className="bar-wrapper">
            <div
              className="bar"
              style={{ width: `${(amount / maxAmount) * 100}%` }}
            >
              ₹ {amount}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}