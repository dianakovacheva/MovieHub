export default function convertDateToString(date: Date): string {
  const stringDate = date?.toISOString()?.split("T")[0] ?? "";

  return stringDate;
}
