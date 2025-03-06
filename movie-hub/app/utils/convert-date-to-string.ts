export default function convertDateToString(date: Date) {
  const stringDate = new Date(date).toISOString().split("T")[0];

  return stringDate;
}
