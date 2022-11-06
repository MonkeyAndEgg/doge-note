import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import styles from "./TransactionTable.module.scss";
import dayjs, { Dayjs } from 'dayjs';
import TableInput from '../TransactionInput/TransactionInput';
import { Transaction } from '../../../models/transaction';
import useTransactionCrud from '../../../hooks/useTransactionCrud';
import { Type } from '@prisma/client';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';

function createData(
  description: string,
  tags: string[],
  type: Type,
  date: Dayjs,
  amount: number,
): Transaction {
  return { description, tags, type, date, amount };
}

export default function TransactionTable() {
  const transactions = useSelector((state: AppState) => state.transaction.transactions);
  const { addTransaction, loadTransactions } = useTransactionCrud();

  const handleSumbit = (description: string, tags: string[], type: Type, date: Dayjs | null, amount: number) => {
    addTransaction(createData(description, tags, type, date ? date : dayjs(new Date()), amount));
    // reloading transactions
    loadTransactions();
  };

  return (
    <div className={styles.container}>
      <TableInput handleSumbit={handleSumbit} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="center">Tags</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Amount&nbsp;($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((entry) => (
              <TableRow
                key={entry.description}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {entry.description}
                </TableCell>
                <TableCell align="center">{entry.tags.join(',')}</TableCell>
                <TableCell align="center">{entry.type}</TableCell>
                <TableCell align="center">{entry.date.format('DD-MM-YYYY').toString()}</TableCell>
                <TableCell align="center">{entry.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}