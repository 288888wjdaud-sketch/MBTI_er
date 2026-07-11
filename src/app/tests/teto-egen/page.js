import TetoEgenQuiz from "./TetoEgenQuiz";

const title = "테토 에겐 테스트 - 테스트할개";
const description = "25문항으로 알아보는 나의 테토상/에겐상 성향 테스트";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function TetoEgenPage() {
  return <TetoEgenQuiz />;
}
