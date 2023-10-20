/**
 * @returns Current UTC date in DD/MM/YYYY format with offsets
 */
export function getUtcDateNowString(offsets: {
  offsetDays?: number;
  offsetMonths?: number;
  offsetYears?: number;
}) {
  const { offsetDays = 0, offsetMonths = 0, offsetYears = 0 } = offsets;

  const dateNow = new Date();
  const dayNow = dateNow.getUTCDate();
  const monthNow = dateNow.getUTCMonth();
  const yearNow = dateNow.getUTCFullYear();

  const newDate = new Date(dateNow);
  newDate.setUTCFullYear(
    yearNow + offsetYears,
    monthNow + offsetMonths,
    dayNow + offsetDays
  );
  const newDay = newDate.getUTCDate();
  const newMonth = newDate.getUTCMonth();
  const newYear = newDate.getUTCFullYear();

  const newDayString = newDay < 10 ? `0${newDay}` : `${newDay}`;
  const realMonth = newMonth + 1;
  const newMonthString = realMonth < 10 ? `0${realMonth}` : `${realMonth}`;

  return `${newDayString}/${newMonthString}/${newYear}`;
}

type TStringFormats = "DD/MM/YYYY" | "YYYY/MM/DD";
export function convertDateStringFormat(
  date: string,
  from: TStringFormats,
  to: TStringFormats
) {
  const array = date.split("/");

  let day;
  let month;
  let year;

  switch (from.toUpperCase()) {
    case "DD/MM/YYYY":
      day = array[0];
      month = array[1];
      year = array[2];
      break;
    case "YYYY/MM/DD":
      year = array[0];
      month = array[1];
      day = array[2];
      break;
    default:
      return "";
  }

  switch (to.toUpperCase()) {
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    default:
      return "";
  }
}