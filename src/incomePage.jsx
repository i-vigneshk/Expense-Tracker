import React, { useState } from "react";
import ExpensePieChart from "./pieChart.jsx";

function IncomePage({ transactions }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get unique categories for dropdown
  const categories = [...new Set(transactions.map((t) => t.name))];

  // Filter transactions based on date range and category
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;
    const categoryMatch =
      !selectedCategory || transaction.name === selectedCategory;

    return (
      (!from || transactionDate >= from) &&
      (!to || transactionDate <= to) &&
      categoryMatch
    );
  });

  // Aggregate income by category
  const aggregatedIncome = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      if (!acc[transaction.name]) {
        acc[transaction.name] = 0;
      }
      acc[transaction.name] += parseFloat(transaction.value);
    }
    return acc;
  }, {});

  // Convert aggregated data to pie chart format
  const pieChartData = Object.entries(aggregatedIncome).map(
    ([category, value]) => ({
      name: category,
      value,
    })
  );

  // Calculate total income
  const totalIncome = pieChartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* Filter Section */}
      <div style={{ marginBottom: "20px" }}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label style={{ marginLeft: "10px" }}>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label style={{ marginLeft: "10px" }}>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Total Income */}
      <h3>Total Income: ₹{totalIncome.toLocaleString()}</h3>

      {/* Pie Chart for Income */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {pieChartData.length > 0 ? (
          <ExpensePieChart data={pieChartData} type="income" />
        ) : (
          <p>No income data available</p>
        )}
      </div>

      {/* List of Income Transactions */}
      <h3>Income Transactions</h3>
      {filteredTransactions.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTransactions.map((transaction, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {transaction.name} - ₹
              {parseFloat(transaction.value).toLocaleString()} on{" "}
              {transaction.date} ({transaction.type})
            </li>
          ))}
        </ul>
      ) : (
        <p>No income transactions available for the selected filters.</p>
      )}
    </div>
  );
}

export default IncomePage;
