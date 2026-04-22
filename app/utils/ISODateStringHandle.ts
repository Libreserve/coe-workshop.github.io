// Local alias to keep ISODateString branding without cross-package imports
type ISODateString = string & { __isoDateBrand: never };

// convert Date → ISODateString
export function toISODateString(date: Date): ISODateString {
  return date.toISOString().split("T")[0] as ISODateString;
}
export function toISODateStringOrNull(date: Date | null | undefined): ISODateString | null {
  return date ? (date.toISOString().split("T")[0] as ISODateString) : null;
}
export function toISODateStringOrUndefined(date: Date | null | undefined): ISODateString | undefined {
  return date ? (date.toISOString().split("T")[0] as ISODateString) : undefined;
}
// check input string is ISODateString or not
export function isISODateString(value: string): value is ISODateString {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/.test(value);
}
