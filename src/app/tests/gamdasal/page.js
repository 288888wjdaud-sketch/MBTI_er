import GamdasalQuiz from "./GamdasalQuiz";

const title = "감다살 감다뒤 데일리 체크 - 테스트할개";
const description = "5문항으로 알아보는 오늘 내 센스와 눈치 컨디션, 감다살일까 감다뒤일까";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function GamdasalPage() {
  return <GamdasalQuiz />;
}
