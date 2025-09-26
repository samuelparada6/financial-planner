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
    { description: 'Groceries', expense: '' },
    { description: 'Utilities', expense: '' },
    { description: 'Rent', expense: '' },
    { description: 'Transportation', expense: '' },
    { description: 'Entertainment', expense: '' },
  ];

  // State for user input
  const [userInput, setUserInput] = useState("");
  const [total, setTotal] = useState("");
  // To hold all of the expenses
  const [expenses, setExpenses] = useState(Array(rows.length).fill(""));

  function handleExpenseChange(idx, e) {
    const newExpenses = [...expenses];
    newExpenses[idx] = e.target.value;
    setExpenses(newExpenses);
  }

  function handleEnter() {
    const num = Number(userInput);
    if (!(Number.isNaN(num))) {
      setTotal(num.toFixed(2));
      setUserInput(num.toFixed(2));
    } else {
      setUserInput("");
    }
  }

  function handleClear() {
    setUserInput("");
    setTotal("");
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
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleEnter}>
          Enter
        </Button>
      </Stack>
    </>
  )
}