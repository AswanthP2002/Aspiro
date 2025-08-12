export default function getDaysLeftFromToday(isoDate: string): number {
  const today = new Date();
  const targetDate = new Date(isoDate);

  
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffMs = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}
