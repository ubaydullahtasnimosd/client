const getValidDate = (dateString) => {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const shortFormatDate = (dateString) => {
  const date = getValidDate(dateString);
  return date ? date.toLocaleDateString("bn-BD") : "তারিখ পাওয়া যায়নি";
};

export const longFormatDate = (dateString) => {
  const date = getValidDate(dateString);

  if (!date) return "তারিখ পাওয়া যায়নি";

  return date.toLocaleString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: true,
  });
};

export default longFormatDate;
