import { GetServerSideProps } from "next";
import TransactionTable from "../components/Transaction/TransactionTable/TransactionTable";
import prisma from "../lib/prisma";
import { setTransactions } from "../store/slices/transactionSlice";
import { wrapper } from "../store/store";
import styles from "../styles/transactions.module.scss";

export default function Transaction() {

  return (
    <div className={styles.container}>
      <TransactionTable />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async () => {
  const transactions = await prisma.transaction.findMany({});

  store.dispatch(setTransactions({ transactions, totalTransactions: transactions.length }));

  return {
    props: {}
  }
});