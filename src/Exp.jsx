import React from "react";
import { Link, useLocation } from "react-router-dom";

function Exp() {
  const location = useLocation(); // Get current route

  return (
    <div className="divExpense">
      <h1>
        <Link to="/">Expense Tracker</Link>
      </h1>
      <nav className="navigation">
        <ul>
          <li>
            <Link
              to="/transactions"
              className={location.pathname === "/transactions" ? "active" : ""}
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/income"
              className={location.pathname === "/income" ? "active" : ""}
            >
              Income
            </Link>
          </li>
          <li>
            <Link
              to="/expense"
              className={location.pathname === "/expense" ? "active" : ""}
            >
              Expense
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Exp;
