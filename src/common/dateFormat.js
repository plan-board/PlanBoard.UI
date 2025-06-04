export const formatDate = (inputDate) => {
  try {
    const dateObj = new Date(inputDate);
    if (isNaN(dateObj)) {
      throw new Error("Invalid date format. Please provide a valid date.");
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch (error) {
    return error.message;
  }
};
