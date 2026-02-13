import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  OutlinedInput,
  InputAdornment
} from '@mui/material';

// Displays the Budget table with static values
export default function BudgetTable({ budgetRows, tempBudget, budgetTotal, editingBudget, handleEditTempBudget, handleBlur, handleFocus, setTempBudget }) {
    
    const rows = editingBudget ? tempBudget : budgetRows;

  return (
    <>
        <TableContainer component={Paper} sx={{ maxWidth: 500, margin: '32px auto' }}>
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
                {rows.map((row, idx) => (
                <TableRow key={row.description}>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">
                        <OutlinedInput
                            value={row.expense}
                            readOnly={!editingBudget}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            onChange={(e) => handleEditTempBudget(idx, e.target.value)}
                            size="small"
                            onBlur={() => editingBudget && handleBlur(setTempBudgetidx)}
                            onFocus={() => editingBudget && handleFocus(setTempBudget, idx)}
                            fullWidth
                        />
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
    </>
  );
}   