import CoupleSyncJoin from "./CoupleSyncJoin";

const title = "커플 싱크로율 테스트 - 테스트할개";
const description = "상대방이 보낸 링크로 답하고 우리 둘의 싱크로율을 바로 확인해보세요";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default async function CoupleSyncJoinPage({ params }) {
  const { code } = await params;
  return <CoupleSyncJoin code={code} />;
}
