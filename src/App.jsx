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
  // State for user input
  const [userInput, setUserInput] = useState("");
  const [total, setTotal] = useState("");

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleEnter() {
    const num = Number(userInput);
    if (!(Number.isNaN(num))) {
      setTotal(num.toFixed(2));
      setUserInput("");
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
            <TableRow>
              <TableCell>Groceries</TableCell>
              <TableCell align="center">
                <OutlinedInput
                  id="user-input"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  value={userInput}
                  onChange={handleInputChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell align='center'>${total}</TableCell>
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