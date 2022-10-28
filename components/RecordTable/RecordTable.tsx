import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useState } from 'react';
import { BalanceEntry } from '../../models/balanceEntry';
import { CATEGORY } from '../../models/category';
import { BALANCE_ENTRY_TYPE } from '../../models/type';
import TableInput from '../TableInput/TableInput';
import styles from "./RecordTable.module.scss";

function createData(
  description: string,
  category: CATEGORY,
  type: BALANCE_ENTRY_TYPE,
  amount: number,
): BalanceEntry {
  return { description, category, type, amount };
}

export default function RecordTable() {
  const [entries, setEntries] = useState([] as BalanceEntry[]);

  const handleSumbit = (description: string, category: CATEGORY, type: BALANCE_ENTRY_TYPE, amount: number) => {
    setEntries(prevEntries => [...prevEntries, createData(description, category, type, amount)]);
  };

  return (
    <div className={styles.container}>
      <TableInput handleSumbit={handleSumbit} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Type</TableCell>
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
                <TableCell align="center">{entry.category}</TableCell>
                <TableCell align="center">{entry.type}</TableCell>
                <TableCell align="center">{entry.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}