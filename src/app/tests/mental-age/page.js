import MentalAgeQuiz from "./MentalAgeQuiz";

const title = "정신연령 테스트 - 테스트할개";
const description = "8문항으로 알아보는 나의 정신연령, 라이프스타일 취향으로 확인해보세요";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function MentalAgePage() {
  return <MentalAgeQuiz />;
}
