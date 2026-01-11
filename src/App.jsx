import { useState, useMemo } from 'react';
import {
  Toolbar,
  Button,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon, Menu as MenuIcon } from '@mui/icons-material';
import './App.css'
import AppBarHeader from './components/AppBarHeader';
import BudgetTable from './components/BudgetTable';
import ExpensesTable from './components/ExpensesTable';

export default function App() {
  
  document.title = "Budget Tracker";

  // Stores categories for expenses
  const rows = useMemo(() => ([
    { description: 'Groceries', expense: 0.00 },
    { description: 'Utilities', expense: 0.00 },
    { description: 'Rent', expense: 0.00 },
    { description: 'Transportation', expense: 0.00 },
    { description: 'Entertainment', expense: 0.00 },
  ]), []);
  
  // State for total expenses
  const [total, setTotal] = useState(0);
  // State to hold all of the expenses, default to 0
  const [expenses, setExpenses] = useState(Array(rows.length).fill(""));

   // Resets all expense inputs and total to initial state
  function handleClear() {
    setExpenses(Array(rows.length).fill(0));
    setTotal(0);
  }

  // Updates the expense value for a specific category by index
  function handleExpenseChange(idx, e) {
    const newExpenses = [...expenses];
    newExpenses[idx] = e.target.value;
    setExpenses(newExpenses);

    // Calculates the total from the updated expenses and formats with commas
    const total = newExpenses.reduce((acc, curr) => {
      // Handles removal of commas before parsing and calculating total
      const cleaned = typeof curr === "string" ? curr.replace(/,/g, "") : curr;
      const num = parseFloat(cleaned);
      return !isNaN(num) ? acc + num : acc;
    }, 0);
    setTotal(total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  } 

    // Clears the expense value when focused if it's 0 or "0.00"
    function handleFocus(index) {
        if (expenses[index] === 0 || expenses[index] === "0.00") {
            const newExpenses = [...expenses];
            newExpenses[index] = "";
            setExpenses(newExpenses);
        }
    }

    // Handles formatting on input blur
    function handleBlur(index) {
        const newExpenses = expenses.map((expense, idx) => {
        if (idx === index) {
            // Checks for previous input and formats accordingly
            const cleaned = typeof expense === "string" ? expense.replace(/,/g, "") : expense;
            const num = Number(cleaned);
            return isNaN(num) ? "0.00"
            : num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return expense;
        });
        setExpenses(newExpenses);
    }

    // Stores budget limits for the rows of expenses
    const budgetRows = useMemo(() => ([
      { description: 'Groceries', expense: 400.00 },
      { description: 'Utilities', expense: 200.00 },
      { description: 'Rent', expense: 1200.00 },
      { description: 'Transportation', expense: 50.00 },
      { description: 'Entertainment', expense: 100.00 },
    ]), []);

    const budgetTotal = budgetRows.reduce((acc, row) => acc + row.expense, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Memoized calculation to determine if each expense exceeds its budget
    const overBudget = useMemo(() =>
        expenses.map((expense, idx) => {
        const cleaned = typeof expense === "string" ? expense.replace(/,/g, "") : expense;
        return parseFloat(cleaned) > budgetRows[idx].expense;
        }),
        [expenses, budgetRows]
    );

  return (
    <>
      <AppBarHeader />
       <Toolbar />
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ m: 1 }} alignItems="flex-start">
        <BudgetTable budgetRows={budgetRows} budgetTotal={budgetTotal} />
        <ExpensesTable
          rows={rows}
          expenses={expenses}
          overBudget={overBudget}
          total={total}
          handleExpenseChange={handleExpenseChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="right" sx={{ m: 1 }}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClear}>
          Clear
        </Button>
      </Stack>
    </>
  )
}