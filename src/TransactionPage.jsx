import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
    setIsLoaded(true); // Prevents premature localStorage update
  }, []);

  // Sync transactions to localStorage whenever they change, after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  // Remove a transaction with confirmation
  const handleRemove = (index) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((_, i) => i !== index)
      );
    }
  };

  // Clear all transactions with confirmation
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all transactions?")) {
      setTransactions([]);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {transactions.length > 0 ? (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {transactions.map((transaction, index) => (
              <li key={index}>
                <span>
                  {transaction.name} - ₹{transaction.value.toLocaleString()} on{" "}
                  {transaction.date} (
                  {transaction.type === "income" ? "Income" : "Expense"})
                </span>
                <button onClick={() => handleRemove(index)}>❌</button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleClearAll}
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🗑 Clear All Transactions
          </button>
          <br />
          <br />
        </>
      ) : (
        <p>No transactions available.</p>
      )}

      <br />
      <Link to="/" className="dashboard">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default TransactionsPage;
