import Link from "next/link";
import styles from "./SiteFooter.module.css";

// 최소한의 공통 푸터. 과하게 채우지 않는다 (Spec.md 2.5.7 참고).
export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} 테스트할개</p>
      <Link href="/" className={styles.link}>
        전체 테스트 보기
      </Link>
    </footer>
  );
}
