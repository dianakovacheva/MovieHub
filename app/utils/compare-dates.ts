export default function compareDates(date1: string): "upcoming" | "previous" {
  const d1 = new Date(date1);
  const today = new Date();

  return d1 > today ? "upcoming" : "previous";
}
