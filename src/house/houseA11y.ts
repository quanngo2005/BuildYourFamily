import type { Dimension, Zone } from "../game/types";
import type { TierLevel, DerivedMark } from "./deriveHouseState";

const DIMENSION_VI: Record<Dimension, string> = {
  economy: "Kinh tế",
  education: "Giáo dục",
  equality: "Bình đẳng",
  emotion: "Tình cảm",
};

const TIER_VI: Record<TierLevel, string> = {
  LOW: "chưa vững chắc, còn nhiều hạn chế",
  MID: "ổn định và cơ bản",
  HIGH: "vững chãi, phát triển và hài hòa",
};

const ZONE_VI: Record<Zone, string> = {
  foundation: "nền móng",
  kitchen: "bếp ăn",
  study: "phòng học",
  structure: "kết cấu tường và mái",
  door: "cửa chính",
  interior: "không gian sinh hoạt chung",
};

export function generateHouseDescription({
  levels,
  marks = [],
}: {
  levels: Record<Dimension, TierLevel>;
  marks?: DerivedMark[];
}): string {
  const parts: string[] = [
    `Ngôi nhà gia đình được định hình qua các quyết định:`,
    `- ${DIMENSION_VI.economy}: mức ${levels.economy} (${TIER_VI[levels.economy]}).`,
    `- ${DIMENSION_VI.education}: mức ${levels.education} (${TIER_VI[levels.education]}).`,
    `- ${DIMENSION_VI.equality}: mức ${levels.equality} (${TIER_VI[levels.equality]}).`,
    `- ${DIMENSION_VI.emotion}: mức ${levels.emotion} (${TIER_VI[levels.emotion]}).`,
  ];

  if (marks.length > 0) {
    const markDescriptions = marks.map(
      (m) => `ở ${ZONE_VI[m.zone]} có dấu ấn ${m.kind}`
    );
    parts.push(`Chi tiết dấu ấn: ${markDescriptions.join("; ")}.`);
  }

  return parts.join(" ");
}
