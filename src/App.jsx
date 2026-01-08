import { useState, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Stack,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { Delete as DeleteIcon, Menu as MenuIcon } from '@mui/icons-material';
import './App.css'

export default function App() {

  document.title = "Budget Tracker";

  // Stores budget limits for the rows of expenses
  const budgetRows = useMemo(() => ([
    { description: 'Groceries', expense: 400.00 },
    { description: 'Utilities', expense: 200.00 },
    { description: 'Rent', expense: 1200.00 },
    { description: 'Transportation', expense: 50.00 },
    { description: 'Entertainment', expense: 100.00 },
  ]), []);


  // Stores categories for expenses
  const rows = useMemo(() => ([
    { description: 'Groceries', expense: 0.00 },
    { description: 'Utilities', expense: 0.00 },
    { description: 'Rent', expense: 0.00 },
    { description: 'Transportation', expense: 0.00 },
    { description: 'Entertainment', expense: 0.00 },
  ]), []);


  // Handles Menu functionality for AppBar
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // State for total expenses
  const [total, setTotal] = useState(0);
  // State to hold all of the expenses, default to 0
  const [expenses, setExpenses] = useState(Array(rows.length).fill(""));

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

  // Resets all expense inputs and total to initial state
  function handleClear() {
    setExpenses(Array(rows.length).fill(0));
    setTotal(0);
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

  // Memoized calculation to determine if each expense exceeds its budget
  const overBudget = useMemo(() =>
    expenses.map((expense, idx) => {
      const cleaned = typeof expense === "string" ? expense.replace(/,/g, "") : expense;
      return parseFloat(cleaned) > budgetRows[idx].expense;
    }),
    [expenses, budgetRows]
  );

  const budgetTotal = budgetRows.reduce((acc, row) => acc + row.expense, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
        {/* Full-bleed AppBar with centered content. Using position fixed so it stays visible on scroll.
            We place a Container inside the Toolbar to keep the inner content centered while the
            AppBar background spans the full viewport. A spacer Toolbar follows to push page content down. */}
        <AppBar position="fixed" sx={{ width: '100%', left: 0, right: 0 }}> 
          <Toolbar disableGutters>
            <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    'aria-labelledby': 'basic-button',
                  },
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Budget Tracker
              </Typography>
              <Button color="inherit">Login</Button>
            </Container>
          </Toolbar>
        </AppBar>
        {/* Spacer so content is not hidden under the fixed AppBar */}
        <Toolbar />
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ m: 1 }} alignItems="flex-start">
        <TableContainer component={Paper} sx={{ maxWidth: 300, margin: '32px auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2} sx={{ fontWeight: "bold" }}>Budget</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgetRows.map((row, idx) => (
                <TableRow key={row.description}>
                  <TableCell>{row.description}</TableCell>
                 <TableCell align="right">
                  <Typography variant="body1">
                    ${row.expense.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </Typography>
                </TableCell>
                </TableRow>
                ))}
              <TableRow>
                <TableCell />
                <TableCell align="right">Total: ${budgetTotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ maxWidth: 500, margin: '32px auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2} sx={{ fontWeight: "bold" }}>Expenses</TableCell>
              </TableRow>
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
                      error={overBudget[idx]}
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
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="right" sx={{ m: 1 }}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClear}>
          Clear
        </Button>
      </Stack>
    </>
  )
}