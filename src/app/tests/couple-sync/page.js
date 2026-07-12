import CoupleSyncStart from "./CoupleSyncStart";

const title = "커플 싱크로율 테스트 - 테스트할개";
const description = "15문항으로 알아보는 우리 둘의 라이프스타일 싱크로율, 링크로 상대방과 비교해보세요";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function CoupleSyncPage() {
  return <CoupleSyncStart />;
}
