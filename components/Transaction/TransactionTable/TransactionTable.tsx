import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useState } from 'react';
import styles from "./TransactionTable.module.scss";
import dayjs, { Dayjs } from 'dayjs';
import { BALANCE_ENTRY_TYPE } from '../../../models/type';
import TableInput from '../TransactionInput/TransactionInput';
import { Transaction } from '../../../models/transaction';

function createData(
  description: string,
  tags: string[],
  type: BALANCE_ENTRY_TYPE,
  time: Dayjs,
  amount: number,
): Transaction {
  return { description, tags, type, time, amount };
}

export default function TransactionTable() {
  const [entries, setEntries] = useState([] as Transaction[]);

  const handleSumbit = (description: string, tags: string[], type: BALANCE_ENTRY_TYPE, time: Dayjs | null, amount: number) => {
    setEntries(prevEntries => [...prevEntries, createData(description, tags, type, time ? time : dayjs(new Date()), amount)]);
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
            {entries.map((entry) => (
              <TableRow
                key={entry.description}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {entry.description}
                </TableCell>
                <TableCell align="center">{entry.tags.join(',')}</TableCell>
                <TableCell align="center">{entry.type}</TableCell>
                <TableCell align="center">{entry.time.format('DD-MM-YYYY').toString()}</TableCell>
                <TableCell align="center">{entry.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}