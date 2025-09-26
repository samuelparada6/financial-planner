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
import './App.css'

export default function App() {
  // State to track amount entered in.
  const [amount, setAmount] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [showAmount, setShowAmount] = useState(false);

  // Handles input change
  function handleChange(value) {
    setAmount(value);
    // console.log('Changed! Here it is: ' + value);
  }

  // Handles Enter
  function handleEnter() {
    setEnteredAmount(amount);
    setAmount("");
    setShowAmount(true);
  }

  // Handles Clear
  function handleClear() {
    setAmount("");
    setShowAmount(false);
  }

  return (
    <>
      <div className="tester">
        <Stack direction="row" spacing={2} alignItems="center" sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Enter Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={amount}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Stack>
      </div>
      <div>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ m: 1 }}>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleEnter}>
            Enter
          </Button>
        </Stack>
      </div>
      {showAmount && (
        <Button color="success" sx={{ m: 1 }}>
          {enteredAmount}
        </Button>
      )
      }
    </>
  )
}