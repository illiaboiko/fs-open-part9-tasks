export function isNumberArray(arr: unknown): arr is number[] {
  return Array.isArray(arr) && arr.every((num) => Number.isFinite(num));
}

export function isNumber(num: unknown): num is number {
  return Number.isFinite(num);
}
