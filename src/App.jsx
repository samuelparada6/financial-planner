import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
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

  // Handles Cancel
  function handleCancel() {
    setAmount("");
    setShowAmount(false);
  }

  return (
    <>
      <div className="tester">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            value={amount}
            onChange={(e) => handleChange(e.target.value)}
          />
        </FormControl>
      </div>
      <div>
        <Stack direction="row" spacing={2} sx={{ m: 1 }}>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleCancel}>
            Cancel
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