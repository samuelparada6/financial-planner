import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export default function BudgetTable({ budgetRows, budgetTotal }) {

  return (
    <>
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
    </>
  );
}   