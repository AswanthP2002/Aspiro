export function isDateExpired(isoDate: string): boolean {
  const today = new Date();
  const targetDate = new Date(isoDate);

  // reset time to midnight for an accurate day-only comparison
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  return targetDate.getTime() < today.getTime();
}