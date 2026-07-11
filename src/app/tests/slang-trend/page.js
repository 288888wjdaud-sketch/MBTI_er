import SlangTrendQuiz from "./SlangTrendQuiz";

const title = "신조어 트렌드 지수 - 테스트할개";
const description = "요즘 유행어 10문제로 알아보는 나의 신조어 트렌드 지수";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function SlangTrendPage() {
  return <SlangTrendQuiz />;
}
