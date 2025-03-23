import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ExpensePieChart = ({ data, type }) => {
  if (!data || data.length === 0) {
    return (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        No data available
      </p>
    );
  }

  const COLORS = {
    expense: [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#D84315",
      "#9C27B0",
      "#E91E63",
    ],
    income: ["#4CAF50", "#3F51B5"],
  };

  return (
    <PieChart width={700} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={120} // 🔹 Set a fixed size for both
        fill="#8884d8"
        dataKey="value"
        label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[type][index % COLORS[type].length]}
          />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
      <Legend />
    </PieChart>
  );
};

export default ExpensePieChart;
