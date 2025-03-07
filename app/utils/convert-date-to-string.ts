export default function convertDateToString(date: Date) {
  if (!date) return null;

  const stringDate = new Date(date).toISOString().split("T")[0];

  return stringDate;
}
