import BalanceGameQuiz from "./BalanceGameQuiz";

const title = "밸런스게임 - 테스트할개";
const description = "짜장면 vs 짬뽕부터 아침형 vs 저녁형까지, 12가지 밸런스게임으로 알아보는 내 선택 리포트";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function BalanceGamePage() {
  return <BalanceGameQuiz />;
}
