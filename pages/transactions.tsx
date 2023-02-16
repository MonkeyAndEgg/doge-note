import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import TransactionTable from "../components/Transaction/TransactionTable/TransactionTable";
import { Transaction } from "../models/transaction";
import { setTransactions, setYears } from "../store/slices/transactionSlice";
import { wrapper } from "../store/store";
import styles from "../styles/transactions.module.scss";
import apiRequest from "../util/apiRequest";
import { Transaction as TransactionSchema } from "@prisma/client";

export default function Transactions() {

  return (
    <div className={styles.container}>
      <TransactionTable />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async () => {
  const response = await apiRequest('/api/transactions', { method: 'GET' });
  const parsedData: { transactions: TransactionSchema[] } = await response.json();

  const yearList: number[] = [];
  const mappedTransactions = parsedData && parsedData.transactions ? parsedData.transactions.map(transaction => {
    const date = dayjs(transaction.date);
    const year = date.year();
    if (yearList.indexOf(year) < 0) {
      yearList.push(year);
    }

    return {
      id: transaction.id,
      description: transaction.description,
      tags: transaction.tags,
      type: transaction.type,
      date: JSON.parse(JSON.stringify(date)), // workaround for serialization error for date
      amount: Number(transaction.amount)
    } as Transaction;
  }) : [];

  // sort the list
  yearList.sort((a, b) => a - b);

  store.dispatch(setTransactions({ transactions: mappedTransactions, totalTransactions: mappedTransactions.length }));
  store.dispatch(setYears({ years: yearList }));

  return {
    props: {}
  }
});