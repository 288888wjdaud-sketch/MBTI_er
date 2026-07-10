import Link from "next/link";
import styles from "./SiteHeader.module.css";

// 워드마크 텍스트. 로고 이미지 파일을 받으면 이 컴포넌트 내부만
// <Image src="/logo.svg" ... /> 로 교체하면 된다 (SiteHeader.js는 손댈 필요 없음).
export default function SiteHeaderLogo() {
  return (
    <Link href="/" className={styles.logo}>
      테스트할개
    </Link>
  );
}
