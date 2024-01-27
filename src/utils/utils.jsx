const months = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];

export function fNWCommas(number) {
  // Round down the number to remove decimal values
  const integerPart = Math.trunc(number);

  // Convert the integer part to a string
  let numberString = integerPart.toString();

  // Use a regular expression to add commas as a thousands separator
  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberString;
}

export function GetPercent(firstVal, secondVal) {
  if (secondVal === 0) {
    return <span className="red-percent">(0%)</span>;
  }

  const perVal = (firstVal / secondVal) * 100;
  return (
    <span className={`${perVal > 50 ? "green-percent" : "red-percent"}`}>
      ({perVal.toFixed(0)}%)
    </span>
  );
  // {((totalYTDValue / totalCYValue) * 100).toFixed(0)}%
}

export function getMonths() {
  return months;
}

export function formatDateTimes(datetimestamp) {
  const date = new Date(datetimestamp);

  // Extract day, month, and year components
  const day = date.getDate();
  const month = date.getMonth(); // Months are 0-based, so add 1
  const monthName = months[month];
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;

  const formattedDate = `${formattedDay}-${monthName}-${year}`;

  return formattedDate;
}

export function getCurrentMonth() {
  const date = new Date();
  return date.getMonth() + 1;
}
