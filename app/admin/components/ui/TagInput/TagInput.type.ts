export interface TagInputProps {
  placeholder?: string;
  label?: string;
  initialAssets?: number[]; // assetId เดิมที่โหลดมาจาก API
  onChange?: (assets: number[]) => void; // callback เมื่อกดยืนยัน
}
export type TagItem = {
  id: string;
  value: string;
};
