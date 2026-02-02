export function parseDateSafe(dateStr: string): Date | null {
  if (!dateStr) return null;

 
  if (dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    const year = y.length === 2 ? `20${y}` : y;
    const parsed = new Date(`${year}-${m}-${d}`);
    return isNaN(parsed.getTime()) ? null : parsed;
  }


  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}
