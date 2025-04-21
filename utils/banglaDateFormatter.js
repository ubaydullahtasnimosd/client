// eslint-disable-next-line no-unused-vars
const formateDate = (date) => {
    return new Date(date).toLocaleDateString("bn-BD");
  };
  
  export const longFormatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: true, 
    });
  };
  
  export default longFormatDate;  