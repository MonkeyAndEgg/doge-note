import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import TransactionTable from "../components/Transaction/TransactionTable/TransactionTable";
import { Transaction } from "../models/transaction";
import { setTransactions } from "../store/slices/transactionSlice";
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

  const mappedTransactions = parsedData.transactions.map(transaction => {
    return {
      description: transaction.description,
      tags: transaction.tags,
      type: transaction.type,
      date: JSON.parse(JSON.stringify(dayjs(transaction.date))), // workaround for serialization error for date
      amount: Number(transaction.amount)
    } as Transaction;
  });

  store.dispatch(setTransactions({ transactions: mappedTransactions, totalTransactions: mappedTransactions.length }));

  return {
    props: {}
  }
});