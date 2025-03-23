# Expense-Tracker

## Overview
The **Expense Calculator** is a web-based application that helps users track their income and expenses efficiently. It provides insights into daily and monthly financial activity, allows category-based filtering, and displays real-time financial balance.

## Features
- **Total Monthly & Daily Expense Tracking**
- **Income-Expense Balance Calculation**
- **Categorization of Expenses (Necessities, etc.)**
- **Single Page Layout (No Scrolling Required)**
- **Category-Based Filtering**
- **Live Date Display**
- **Auto-Merge Same Categories**
- **Daily & Monthly Income/Expense Breakdown**

## Components
### 1. **ExpensePage.jsx**
Handles expense tracking and visualization.
- **Filters transactions by date range and category**
- **Aggregates expenses into a pie chart**
- **Displays total daily and monthly expenses**
- **Lists transactions dynamically**

### 2. **IncomePage.jsx**
Manages income tracking.
- **Filters transactions based on date and category**
- **Aggregates income data into a pie chart**
- **Displays total income for daily and monthly periods**
- **Lists income transactions dynamically**

### 3. **PieChart.jsx**
- **Renders pie charts for both income and expenses**
- **Ensures uniform sizing for visual consistency**
- **Updates dynamically based on filtered data**

### 4. **App.jsx**
- **Manages live date display**
- **Embeds ExpensePage and IncomePage without scrolling**
- **Aligns expense and income sections side by side**
- **Integrates category-based filtering and transaction merging**

## Data Structure
```json
{
  "transactions": [
    {
      "id": 1,
      "name": "Groceries",
      "category": "Necessity",
      "type": "expense",
      "value": 500,
      "date": "2025-03-05"
    },
    {
      "id": 2,
      "name": "Salary",
      "category": "Income",
      "type": "income",
      "value": 50000,
      "date": "2025-03-01"
    }
  ]
}
```

## Usage
1. **Filter Transactions**
   - Select a date range
   - Choose a category from the dropdown
   
2. **View Income & Expenses**
   - Pie charts update dynamically
   - Total income & expenses are displayed separately
   
3. **Live Date Display**
   - Shows the current date in the header

4. **Transaction Management**
   - Adding the same category updates the existing category total
   - Separate daily and monthly calculations for both income & expenses

## Notes
- The UI ensures all data is visible without scrolling.
- Pie charts for income and expense are of equal size.
- Transactions update in real-time when added or removed.


