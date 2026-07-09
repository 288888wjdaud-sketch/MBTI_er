import { MBTI_CODES } from "@/data/mbtiTypes";
import { allCanonicalPairs, toPairSlug } from "@/lib/mbtiSlug";

// TODO: 실제 도메인을 구매하면 NEXT_PUBLIC_SITE_URL 환경변수로 교체
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const staticPages = [{ url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 }];

  const typePages = MBTI_CODES.map((code) => ({
    url: `${BASE_URL}/mbti/${code.toLowerCase()}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const matchPages = allCanonicalPairs().map(([a, b]) => ({
    url: `${BASE_URL}/mbti/match/${toPairSlug(a, b)}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...typePages, ...matchPages];
}
