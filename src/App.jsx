import { useState, useMemo } from 'react';
import {
  Toolbar,
  Button,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon, Menu as MenuIcon, Edit as EditIcon } from '@mui/icons-material';
import './App.css'
import AppBarHeader from './components/AppBarHeader';
import BudgetTable from './components/BudgetTable';
import ExpensesTable from './components/ExpensesTable';

export default function App() {
  
  document.title = "Budget Tracker";
  
  // State to hold all of the expenses, default to 0 for each category
  const [expenseRows, setExpenseRows] = useState([
    { description: 'Groceries', expense: 0 },
    { description: 'Utilities', expense: 0 },
    { description: 'Rent', expense: 0 },
    { description: 'Transportation', expense: 0 },
    { description: 'Entertainment', expense: 0 },
  ]);
  // State for the updated Budget
  const [budgetRows, setBudgetRows] = useState([
    { description: 'Groceries', expense: 0 },
    { description: 'Utilities', expense: 0 },
    { description: 'Rent', expense: 0 },
    { description: 'Transportation', expense: 0 },
    { description: 'Entertainment', expense: 0 },
  ]);
  // State for total expenses
  const [expenseTotal, setExpenseTotal] = useState(0);
  // State for budget total
  const [budgetTotal, setBudgetTotal] = useState(0);
  // State for Editing the Budget
  const [editingBudget, setEditingBudget] = useState(false);
  // State for the temporary Budget
  const [tempBudget, setTempBudget] = useState([]);

   // Resets all expense inputs and total to initial state
  function handleClear() {
    setExpenseRows(expenseRows.map(row => ({ ...row, expense: 0 })));
    setExpenseTotal(0);
  }

  // Updates the expense value for a specific category by index
  function handleExpenseChange(idx, e) {
    const newExpenses = [...expenseRows];
    newExpenses[idx] = { ...newExpenses[idx], expense: e.target.value };
    setExpenseRows(newExpenses);

    // Calculates the total from the updated expenses and formats with commas
    const total = newExpenses.reduce((acc, curr) => {
      // Handles removal of commas before parsing and calculating total
      const cleaned = typeof curr.expense === "string" ? curr.expense.replace(/,/g, "") : curr.expense;
      const num = parseFloat(cleaned);
      return !isNaN(num) ? acc + num : acc;
    }, 0);
    setExpenseTotal(total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  } 

    // Clears the expense value when focused if it's 0 or "0.00"
    function handleExpenseFocus(index) {
        if (expenseRows[index].expense === 0 || expenseRows[index].expense === "0.00") {
            const newExpenses = [...expenseRows];
            newExpenses[index] = { ...newExpenses[index], expense: "" };
            setExpenseRows(newExpenses);
        }
    }

    // Handles formatting on input blur
    function handleExpenseBlur(index) {
      setExpenseRows(prev =>
        prev.map((row, idx) => {
          if (idx !== index) return row;

          const cleaned = typeof row.expense === "string" ? row.expense.replace(/,/g, ""): row.expense;

          const num = Number(cleaned);

          return { ...row, expense: isNaN(num) ? "0.00" : num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,}),};
        })
      );
    }


    // Memoized calculation to determine if each expense exceeds its budget
    const overBudget = useMemo(() =>
        expenseRows.map((row, idx) => {
        const cleaned = typeof row.expense === "string" ? row.expense.replace(/,/g, "") : row.expense;
        return parseFloat(cleaned) > budgetRows[idx].expense;
        }),
        [expenseRows, budgetRows]
    );

    // Handle clicking the Edit button
    function handleClickEditBudget() {
      setTempBudget(budgetRows.map(row => ({ ...row })));
      setEditingBudget(true);
    };

    // Handle active editing of the temporary budget
    function handleEditTempBudget(idx, e) {
      setTempBudget(prev => {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          expense: e,
        };
        return updated;
      });
    };

    // Handle Save budget
    function handleSaveBudget() {
      setBudgetRows(tempBudget);
      setTempBudget(Array(budgetRows.length).fill(""));
      setEditingBudget(false);

      // Calculate budget total
      const budgetTotal = tempBudget.reduce((acc, row) => {
        const cleaned = typeof row.expense === "string" ? row.expense.replace(/,/g, "") : row.expense;
        const num = parseFloat(cleaned);
        return acc + (isNaN(num) ? 0 : num);
      }, 0);
      setBudgetTotal(budgetTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    };

    // Handle Cancel changes to budget
    function handleCancelBudget() {
      setTempBudget(Array(budgetRows.length).fill(""));
      setEditingBudget(false);
    };

    // Clears the budget row value when focused if it's 0 or "0.00"
    function handleBudgetFocus(index) {
        setTempBudget(prev =>
          prev.map((row, idx) =>
            idx === index && (row.expense === 0 || row.expense === "0.00")
              ? { ...row, expense: "" }
              : row
          )
        );
    }

    // Handles formatting on input blur
    function handleBudgetBlur(index) {
      setTempBudget(prev => prev.map((row, idx) => {
        if (idx !== index) return row;
        const cleaned = typeof row.expense === "string" ? row.expense.replace(/,/g, "") : row.expense;
        const num = Number(cleaned);
        return { ...row, expense: isNaN(num) ? "0.00" : num.toLocaleString(undefined, {
          minimumFractionDigits: 2, maximumFractionDigits: 2, }), };
        })
      );
    }

  return (
    <>
      <AppBarHeader />
       <Toolbar />
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ m: 1 }} alignItems="flex-start">
        <Stack spacing={1} alignItems="flex-start">
          <BudgetTable 
            budgetRows={budgetRows}
            tempBudget={tempBudget}
            budgetTotal={budgetTotal}
            editingBudget={editingBudget}
            handleEditTempBudget={handleEditTempBudget}
            handleBlur={handleBudgetBlur}
            handleFocus={handleBudgetFocus}
          />
          {/* Display depends on whether 'Edit' has been clicked or not */}
          {!editingBudget ? (
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={handleClickEditBudget}
            >
              Edit
            </Button>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button variant="contained" size="small" onClick={handleSaveBudget}>
                Save
              </Button>
              <Button variant="outlined" size="small" onClick={handleCancelBudget}>
                Cancel
              </Button>
            </Stack>
          )}
        </Stack>
        <ExpensesTable
          expenses={expenseRows}
          overBudget={overBudget}
          total={expenseTotal}
          handleExpenseChange={handleExpenseChange}
          handleFocus={handleExpenseFocus}
          handleBlur={handleExpenseBlur}
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