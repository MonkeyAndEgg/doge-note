import { TableContainer, Table, TableRow, TableCell, TableBody, Paper, Checkbox, TablePagination } from '@mui/material';
import styles from "./TransactionTable.module.scss";
import dayjs, { Dayjs } from 'dayjs';
import TableInput from '../TransactionInput/TransactionInput';
import { Transaction } from '../../../models/transaction';
import useTransactionCrud from '../../../hooks/useTransactionCrud';
import { Type } from '@prisma/client';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { useState } from 'react';
import EnhancedTableHead, { Order } from '../../EnhancedTableHead/EnhancedTableHead';
import { getComparator } from '../../../util/comparator';
import { stableSort } from '../../../util/stableSort';
import EnhancedTableToolbar from '../../EnhancedTableToolbar/EnhancedTableToolbar';

function createData(
  description: string,
  tags: string[],
  type: Type,
  date: Dayjs,
  amount: number,
  id?: string,
): Transaction {
  return { id, description, tags, type, date, amount };
}

export default function TransactionTable() {
  const transactions = useSelector((state: AppState) => state.transaction.transactions);
  const { addTransaction, loadTransactions, deleteTransaction } = useTransactionCrud();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Transaction>('date');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSumbit = async (description: string, tags: string[], type: Type, date: Dayjs | null, amount: number) => {
    await addTransaction(createData(description, tags, type, date ? date : dayjs(new Date()), amount));
    // reloading transactions
    await loadTransactions();
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Transaction,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = transactions.map(transaction => transaction.id ? transaction.id : '');
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isItemSelected = (transaction: Transaction) => {
    console.log('current transaction id is', transaction.id);
    return transaction.id ? selected.indexOf(transaction.id) > -1 : false;
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    await Promise.all(selected.map((id: string) => 
      deleteTransaction(id)));
    setSelected([]);
    await loadTransactions();
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  return (
    <div className={styles.container}>
      <TableInput handleSumbit={handleSumbit} />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete} />
        { transactions.length > 0 && <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size='medium'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={onSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={transactions.length}
            />
            <TableBody>
              {stableSort(transactions, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction: any, index) => {
                const isSelected = isItemSelected(transaction);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (<TableRow
                  hover
                  key={transaction.description}
                  role="checkbox"
                  tabIndex={-1}
                  aria-checked={isSelected}
                  selected={isSelected}
                  onClick={(event) => handleClick(event, transaction.id ? transaction.id : '')}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" id={labelId} padding="none">
                    {transaction.description}
                  </TableCell>
                  <TableCell align="center">{transaction.tags.join(',')}</TableCell>
                  <TableCell align="center">{transaction.type}</TableCell>
                  <TableCell align="center">{dayjs(transaction.date).format('YYYY-MM-DD').toString()}</TableCell>
                  <TableCell align="center">{transaction.amount}</TableCell>
                </TableRow>);
              })}
              {
                emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
          </TableContainer>
        }
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}