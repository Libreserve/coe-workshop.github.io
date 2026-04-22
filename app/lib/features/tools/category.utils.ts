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

export function getCategoryDisplay(category: ToolCategories): string {
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
  
  return `${category} ${emojiMap[category]}`;
}
