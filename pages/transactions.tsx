import RecordTable from "../components/RecordTable/RecordTable";
import styles from "../styles/balance.module.scss";

export default function Transaction() {

  return (
    <div className={styles.container}>
      <RecordTable />
    </div>
  );
}