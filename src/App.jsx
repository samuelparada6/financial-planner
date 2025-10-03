import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.css'

export default function App() {

  // Stores categories for expenses
  const rows = [
    { description: 'Groceries', expense: 0.00 },
    { description: 'Utilities', expense: 0.00 },
    { description: 'Rent', expense: 0.00 },
    { description: 'Transportation', expense: 0.00 },
    { description: 'Entertainment', expense: 0.00 },
  ];

  // State for total expenses
  const [total, setTotal] = useState(0);
  // State to hold all of the expenses, default to 0
  const [expenses, setExpenses] = useState(Array(rows.length).fill(""));

  // Updates the expense value for a specific category by index
  function handleExpenseChange(idx, e) {
    // Updates the expense value for a specific category by index
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

  // Resets all expense inputs and total to initial state
  function handleClear() {
    setExpenses(Array(rows.length).fill(0));
    setTotal(0);
    }

  // Handles formatting on input blur
  function handleBlur(index) {
    const newExpenses = expenses.map((expense, idx) => {
      if (idx === index) {
        const num = Number(expense);
        return isNaN(num) ? "0.00"
          : num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      return expense;
    });
    setExpenses(newExpenses);
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 500, margin: '32px auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={row.description}>
                <TableCell>{row.description}</TableCell>
                <TableCell align="right">
                  <OutlinedInput
                    id="user-input"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    value={expenses[idx]}
                    onChange={e => handleExpenseChange(idx, e)}
                    onFocus={() => {
                      if (expenses[idx] === 0 || expenses[idx] === "0.00") {
                        const newExpenses = [...expenses];
                        newExpenses[idx] = "";
                        setExpenses(newExpenses);
                      }
                    }}
                    onBlur={() => handleBlur(idx)}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell align="right">Total: ${total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ m: 1 }}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClear}>
          Clear
        </Button>
      </Stack>
    </>
  )
}