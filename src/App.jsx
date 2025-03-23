import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TransactionsPage from "./TransactionPage.jsx";
import Exp from "./exp.jsx";
import IncomePage from "./incomePage.jsx";
import ExpensePage from "./expensePage.jsx";
import ExpensePieChart from "./pieChart.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  "./styles.css"

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date()); // ✅ Set default date as today

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !value || !date) return;

    const newTransaction = {
      name: category,
      value: parseFloat(value),
      date: date.toISOString().split("T")[0], // ✅ Convert date to YYYY-MM-DD
      type,
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    setCategory("");
    setValue("");
    setDate(new Date()); // ✅ Reset to today's date after submit
  };

  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const incomeCategories = ["Salary", "Other"];
  const expenseCategories = [
    "Food",
    "Rent",
    "Transport",
    "Entertainment",
    "Shopping",
    "Other",
  ];

  const aggregateTransactions = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const existingCategory = acc.find((t) => t.name === transaction.name);
      if (existingCategory) {
        existingCategory.value += transaction.value;
      } else {
        acc.push({ ...transaction });
      }
      return acc;
    }, []);
  };

  const aggregatedIncome = aggregateTransactions(incomeTransactions);
  const aggregatedExpenses = aggregateTransactions(expenseTransactions);

  // ✅ Calculate total income and expenses
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.value, 0);
  const totalExpenses = expenseTransactions.reduce(
    (sum, t) => sum + t.value,
    0
  );
  const balance = totalIncome - totalExpenses; // ✅ Calculate remaining balance

  return (<div className="conter-center">
    <Router>
      <Exp />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {/* ✅ Display balance amount */}
              <center>
                <h2 style={{ color: balance >= 0 ? "green" : "red" }}>
                  Total Balance: ₹{balance.toLocaleString()}
                </h2>
              </center>

              <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {(type === "income"
                    ? incomeCategories
                    : expenseCategories
                  ).map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Amount"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />

                {/* ✅ Embedded DatePicker instead of input */}
                <DatePicker
                  selected={date}
                  onChange={(newDate) => setDate(newDate)}
                  maxDate={new Date()} // ⛔ Prevent future dates
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />

                <button type="submit">Add {type}</button>
              </form>

              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  gap: "50px",
                  marginTop: "30px",
                }}
              >
                <div className="expenseChart">
                  <h3>Expense Breakdown</h3>
                  <ExpensePieChart  data={aggregatedExpenses} type="expense" />
                </div>

                <div className="incomeChart">
                  <h3>Income Breakdown</h3>
                  <ExpensePieChart data={aggregatedIncome} type="income" />
                </div>
              </div>
            </div>
          }
        />

        <Route path="/transactions" element={<TransactionsPage />} />
        <Route
          path="/income"
          element={<IncomePage transactions={incomeTransactions} />}
        />
        <Route
          path="/expense"
          element={<ExpensePage transactions={expenseTransactions} />}
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
