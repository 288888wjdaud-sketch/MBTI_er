import { redirect } from "next/navigation";
import { MBTI_CODES } from "@/data/mbtiTypes";
import { toPairSlug } from "@/lib/mbtiSlug";

// 예전 쿼리스트링 URL(?me=..&partner=..)로 들어오는 방문자를
// 새 경로 기반 URL로 보내주는 호환용 리다이렉트.
export default async function LegacyResultPage({ searchParams }) {
  const params = await searchParams;
  const me = String(params?.me ?? "").toUpperCase();
  const partner = String(params?.partner ?? "").toUpperCase();

  if (MBTI_CODES.includes(me) && MBTI_CODES.includes(partner)) {
    redirect(`/mbti/match/${toPairSlug(me, partner)}`);
  }

  redirect("/");
}
