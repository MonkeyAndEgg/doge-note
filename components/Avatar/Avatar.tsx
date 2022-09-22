import styles from "./Avatar.module.scss";
import Image from "next/image";

interface AvatarProps {
  src: string;
}

export default function Avatar({ src }: AvatarProps) {
  return (
    <div className={styles.avatar}>
      <Image src={src} alt='user avatar' />
    </div>
  );
}