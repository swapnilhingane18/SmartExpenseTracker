function MonthlyChart({ data }) {
  const maxAmount = Math.max(...Object.values(data), 1);

  return (
    <div>
      <h3>Monthly Expense Chart</h3>

      <div className="chart">
        {Object.entries(data).map(([month, amount]) => (
          <div key={month} className="chart-row">
            <span>{month}</span>

            <div
              className="bar"
              style={{
                width: `${(amount / maxAmount) * 100}%`,
              }}
            >
              ₹ {amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyChart;
