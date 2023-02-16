import Image from "next/image";
import Avatar from "../Avatar/Avatar";
import NavLink from "../NavLink/NavLink";
import styles from "./Sidebar.module.scss";

const navLinks = [
  {
    href: '/transactions',
    label: 'Transaction'
  }
];

export default function Sidebar() {

  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.user}>
          {/* <Avatar src="" /> */}
          <p>Hey User1</p>
        </div>
        <div>
          {navLinks.map(navLink => <NavLink key={navLink.label} href={navLink.href} label={navLink.label} />)}
        </div>
      </div>
      <div className={styles.footer}>
        <Image src="/images/dance.gif" alt="footer image" width={100} height={100} />
      </div>
    </div>
  );
}