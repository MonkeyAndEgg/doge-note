import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <a>
        {label}
      </a>
    </Link>
  );  
}