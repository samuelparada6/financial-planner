import { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import './App.css'

function App() {

  return (
    <>
      <div className="tester">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </div>
      <div>
        <Stack direction="row" spacing={2} sx={{ m: 1 }}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Cancel
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Enter
          </Button>
        </Stack>
      </div>
    </>
  )
}

export default App
