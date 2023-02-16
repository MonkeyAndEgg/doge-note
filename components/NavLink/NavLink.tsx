import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavLink.module.scss";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <a className={styles.navLink}>
        {label}
      </a>
    </Link>
  );  
}