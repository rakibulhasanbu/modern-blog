const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const getDay = (dateString: string): string => {
  const date = new Date(dateString);

  return `${date?.getDate()} ${months[date.getMonth()]}`;
};

export const getFullDay = (dateString: string) => {
  const date = new Date(dateString);

  return `${date?.getDate()} ${months[date.getMonth()]} ${date?.getFullYear()}`;
};
