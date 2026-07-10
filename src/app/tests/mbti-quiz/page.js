import MbtiQuizClient from "./MbtiQuizClient";

export const metadata = {
  title: "MBTI 검사 - MBTIer",
  description: "24문항으로 알아보는 나의 진짜 MBTI 유형 검사",
};

export default function MbtiQuizPage() {
  return <MbtiQuizClient />;
}
