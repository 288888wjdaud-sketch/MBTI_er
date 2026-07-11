import AttachmentQuiz from "./AttachmentQuiz";

const title = "성인 애착유형 테스트 - 테스트할개";
const description = "10문항으로 알아보는 나의 연애 애착유형, 안정형·불안형·회피형·혼란형";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function AttachmentPage() {
  return <AttachmentQuiz />;
}
