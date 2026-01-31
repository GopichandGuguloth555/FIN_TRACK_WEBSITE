export function detectCategory(description: string): string {
  const d = description.toLowerCase();

  if (d.includes("uber") || d.includes("ola") || d.includes("ride"))
    return "Travel";

  if (
    d.includes("restaurant") ||
    d.includes("food") ||
    d.includes("dinner") ||
    d.includes("lunch")
  )
    return "Food";

  if (
    d.includes("electric") ||
    d.includes("bill") ||
    d.includes("recharge") ||
    d.includes("mobile")
  )
    return "Bills";

  if (
    d.includes("amazon") ||
    d.includes("flipkart") ||
    d.includes("shopping")
  )
    return "Shopping";

  if (
    d.includes("salary") ||
    d.includes("freelance") ||
    d.includes("credit")
  )
    return "Income";

  return "Others";
}
