import { ReactElement } from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Sidebar />
      {children}
    </div>
  );
}