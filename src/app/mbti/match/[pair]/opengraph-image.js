import { ImageResponse } from "next/og";
import { getNickname } from "@/data/mbtiTypes";
import { generateReport } from "@/lib/generateReport";
import { parsePairSlug } from "@/lib/mbtiSlug";

// 136개 조합 x 2 성별 = 272장을 미리 렌더링하는 대신, 요청 시 동적으로 카드 이미지를 생성한다
// (Spec.md Phase 2 "2. 바이럴 공유 기능" 3번 참고).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { pair } = await params;
  const parsed = parsePairSlug(pair);
  const [a, b] = parsed ?? ["ESTJ", "INFP"];
  const { score } = generateReport(a, b);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.6 }}>테스트할개 · MBTI 궁합</div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 800, marginTop: 24 }}>
          {a} ({getNickname(a)}) × {b} ({getNickname(b)})
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 800, color: "#ff4b6e", marginTop: 32 }}>
          궁합 점수 {score}점
        </div>
      </div>
    ),
    { ...size }
  );
}
