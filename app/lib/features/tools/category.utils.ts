import { ToolCategories } from "./tools.type";

export function toToolCategory(value: string | undefined | null): ToolCategories | undefined {
  if (!value) return undefined;

  if (Object.values(ToolCategories).includes(value as ToolCategories)) {
    return value as ToolCategories;
  }

  console.warn(`Invalid category received from backend: ${value}`);
  return undefined;
}

export function isToolCategory(value: string): value is ToolCategories {
  return Object.values(ToolCategories).includes(value as ToolCategories);
}

export function getAllCategories(): ToolCategories[] {
  return Object.values(ToolCategories);
}

const categoryThaiMap: Record<ToolCategories, string> = {
  [ToolCategories.MECHANICAL]: "เครื่องกล",
  [ToolCategories.ELECTRICAL]: "ไฟฟ้า",
  [ToolCategories.PNEUMATIC]: "เครื่องลม",
  [ToolCategories.HYDRAULIC]: "ไฮดรอลิก",
  [ToolCategories.MEASUREMENT]: "เครื่องมือวัด",
  [ToolCategories.SOLDERING]: "บัดกรี",
  [ToolCategories.HAND_TOOLS]: "เครื่องมือมือ",
  [ToolCategories.POWER_TOOLS]: "เครื่องมือไฟฟ้า",
  [ToolCategories.SAFETY]: "ความปลอดภัย",
  [ToolCategories.ROBOTICS]: "หุ่นยนต์",
  [ToolCategories.AUTOMATION]: "ระบบอัตโนมัติ",
  [ToolCategories.PROTOTYPING]: "PROTOTYPING",
  [ToolCategories.THREE_D_PRINTING]: "พิมพ์ 3 มิติ",
  [ToolCategories.CNC]: "CNC",
  [ToolCategories.MAINTENANCE]: "ซ่อมบำรุง",
  [ToolCategories.OTHER]: "อื่นๆ",
};

const emojiMap: Record<ToolCategories, string> = {
  [ToolCategories.MECHANICAL]: "🔧",
  [ToolCategories.ELECTRICAL]: "🔌",
  [ToolCategories.PNEUMATIC]: "💨",
  [ToolCategories.HYDRAULIC]: "🛢️",
  [ToolCategories.MEASUREMENT]: "📏",
  [ToolCategories.SOLDERING]: "🔥",
  [ToolCategories.HAND_TOOLS]: "🛠️",
  [ToolCategories.POWER_TOOLS]: "⚙️",
  [ToolCategories.SAFETY]: "🦺",
  [ToolCategories.ROBOTICS]: "🤖",
  [ToolCategories.AUTOMATION]: "🏭",
  [ToolCategories.PROTOTYPING]: "🧪",
  [ToolCategories.THREE_D_PRINTING]: "🖨️",
  [ToolCategories.CNC]: "🧱",
  [ToolCategories.MAINTENANCE]: "🔩",
  [ToolCategories.OTHER]: "📦",
};

export function getCategoryDisplay(category: ToolCategories): string {
  return `${categoryThaiMap[category]} ${emojiMap[category]}`;
}

export function getCategoryThaiName(category: ToolCategories): string {
  return categoryThaiMap[category];
}
