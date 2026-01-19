function MonthlyChart({ summary }) {
  const maxAmount = Math.max(...Object.values(summary), 1);

  return (
    <div className="chart-container">
      <h3>Monthly Expense Chart</h3>

      {Object.entries(summary).map(([month, amount]) => (
        <div key={month} className="chart-row">
          <span className="chart-label">{month}</span>

          <div
            className="chart-bar"
            style={{
              width: `${(amount / maxAmount) * 100}%`,
            }}
          >
            ₹ {amount}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MonthlyChart;
