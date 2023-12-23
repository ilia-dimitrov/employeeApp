import { convertToStandardFormat } from "./dateParse";

function splitStringToArr(string) {
  return string.split(/\r\n|\r|\n/);
}

function formatArrayToMatrix(array) {
  return array
    .filter((row) => row.trim().length !== 0)
    .map((row) => row.split(","));
}

function sanitazeArr(array) {
  return array.map((row, rowIndex) => {
    // 4 arguments per row
    if (row.length !== 4) {
      console.error(
        `Invalid row at index ${rowIndex + 1}. Expected 4 items, found ${
          row.length
        }.`
      );
      throw new Error(
        `Invalid row at index ${rowIndex + 1}. Expected 4 items, found ${
          row.length
        }.`
      );
    }
    return row.map((cell, columnIndex) => {
      let dateFromIndex = 2;
      let dateToIndex = 3;

      //checking for Null dateTo
      if (columnIndex === dateToIndex && cell === "NULL") {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        cell = `${year}-${month}-${day}`;
        cell = convertToStandardFormat(cell);
        // console.log(cell);
      } else if (columnIndex === dateToIndex) {
        cell = convertToStandardFormat(cell);
      }

      //checking for Null dateFrom
      if (columnIndex === dateFromIndex && cell === "NULL") {
        throw new Error(`Invalid data. Date From can't be NULL`);
      } else if (columnIndex === dateFromIndex) {
        cell = convertToStandardFormat(cell);
      }

      if (columnIndex === 0 || columnIndex === 1) {
        if (isNaN(parseInt(cell)))
          throw new Error(
            `Invalid data. Column ${columnIndex + 1} should be a number`
          );
      }

      return cell.trim();
    });
  });
}

//check if dateFrom isnt > than dateTo
function lastValidation(array) {
  const dateFromIndex = 2;
  const dateToIndex = 3;

  array.forEach((row, index) => {
    const dateFrom = new Date(row[dateFromIndex]);
    const dateTo = new Date(row[dateToIndex]);

    if (dateFrom > dateTo) {
      throw new Error(
        `Invalid data. DateFrom cannot be greater than DateTo in row ${
          index + 1
        }`
      );
    }
  });
}

export { splitStringToArr, formatArrayToMatrix, sanitazeArr, lastValidation };
