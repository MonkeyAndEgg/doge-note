import TransactionTable from "../components/Transaction/TransactionTable/TransactionTable";
import styles from "../styles/transactions.module.scss";

export default function Transaction() {

  return (
    <div className={styles.container}>
      <TransactionTable />
    </div>
  );
}