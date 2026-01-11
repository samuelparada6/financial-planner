import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

export default function ExpensesTable({ rows, expenses, overBudget, total, handleExpenseChange, handleFocus, handleBlur }) {

    return (
        <>
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
                                        onFocus={() => handleFocus(idx)}
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
        </>
    )
}