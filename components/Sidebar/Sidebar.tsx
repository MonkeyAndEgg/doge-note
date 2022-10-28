import Avatar from "../Avatar/Avatar";
import NavLink from "../NavLink/NavLink";
import styles from "./Sidebar.module.scss";

const navLinks = [
  {
    href: '/balance',
    label: 'Balance'
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
    </div>
  );
}