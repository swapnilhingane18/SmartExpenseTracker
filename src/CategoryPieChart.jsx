export default function CategoryPieChart({ data }) {
  const total = Object.values(data).reduce((s, v) => s + v, 0);

  if (!total) {
    return <p>No category data available.</p>;
  }

  let currentAngle = 0;

  const colors = {
    Food: "#22c55e",
    Travel: "#3b82f6",
    Shopping: "#a855f7",
    Bills: "#ef4444",
    Other: "#6b7280",
  };

  const segments = Object.entries(data).map(([category, value]) => {
    const angle = (value / total) * 360;
    const segment = `${colors[category] || "#999"} ${currentAngle}deg ${
      currentAngle + angle
    }deg`;
    currentAngle += angle;
    return segment;
  });

  return (
    <div className="pie-container">
      <h2>Category Summary</h2>

      <div
        className="pie"
        style={{
          background: `conic-gradient(${segments.join(",")})`,
        }}
      />

      <ul className="legend">
        {Object.entries(data).map(([cat, val]) => (
          <li key={cat}>
            <span
              className="dot"
              style={{ background: colors[cat] || "#999" }}
            />
            {cat} – ₹ {val}
          </li>
        ))}
      </ul>
    </div>
  );
}
