import moment from "moment";

export function convertToStandardFormat(dateString) {
  let formattedString = "";

  //checking for "/" or "." in data format
  for (const character of dateString) {
    if (character === "/" || character === ".") {
      formattedString += "-";
    } else {
      formattedString += character;
    }
  }

  const inputFormats = ["YYYY-MM-DD", "YYYY-DD-MM", "DD-MM-YYYY", "MM-DD-YYYY"];

  let detectedFormat = "";

  // First loop for strict parsing
  for (const format of inputFormats) {
    const parsedDate = moment(formattedString, format, true); // Use strict parsing
    if (parsedDate.isValid()) {
      detectedFormat = format;
      break;
    }
  }

  // Second loop for non-strict parsing
  if (detectedFormat === "") {
    for (const format of inputFormats) {
      const parsedDate = moment(formattedString, format); // Non-strict parsing
      if (parsedDate.isValid()) {
        detectedFormat = format;
        break;
      }
    }
  }

  if (detectedFormat !== "") {
    // Convert to 'YYYY-MM-DD'
    const dateObject = moment(formattedString, detectedFormat);
    return dateObject.format("YYYY-MM-DD");
  }

  throw new Error(`Error detecting or converting date format: ${dateString}`);
}
