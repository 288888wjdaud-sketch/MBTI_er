"use client";

import { useRouter } from "next/navigation";

// 브라우저 히스토리로 돌아가는 버튼. 궁합 결과 페이지에서 유형 페이지로 넘어왔을 때
// 그대로 원래 보던 궁합 결과로 되돌아갈 수 있게 해준다 (전역 상태 불필요).
export default function BackButton({ className, children }) {
  const router = useRouter();
  return (
    <button type="button" className={className} onClick={() => router.back()}>
      {children}
    </button>
  );
}
