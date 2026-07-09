import styles from "./AdSlot.module.css";

// 애드센스 등 실제 광고 승인 전까지의 자리 표시자.
// 승인 후에는 이 컴포넌트 내부만 실제 광고 스니펫으로 교체하면 된다.
export default function AdSlot({ label = "광고 영역" }) {
  return (
    <div className={styles.slot} aria-hidden="true">
      {label}
    </div>
  );
}
