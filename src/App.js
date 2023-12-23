import { useState } from "react";
import "./App.css";
import {
  splitStringToArr,
  formatArrayToMatrix,
  sanitazeArr,
  lastValidation,
} from "./utils/dataUtils";
import { logic } from "./utils/logic";
import Heading from "./components/Heading";
import PairsDisplay from "./components/PairsDisplay";

function App() {
  const [employeePairsData, setEmployeePairsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxDaysPairs, setMaxDaysPairs] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleUpload(e) {
    e.preventDefault();

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      try {
        const dataArr = splitStringToArr(reader.result);
        const dataMatrix = formatArrayToMatrix(dataArr);
        const sanitizeCell = sanitazeArr(dataMatrix);

        lastValidation(sanitizeCell);

        const newPairsData = logic(sanitizeCell);
        setEmployeePairsData(newPairsData);

        // pair with most days work together
        if (newPairsData.length > 0) {
          const maxTotalDays = Math.max(
            ...newPairsData.map(([, details]) => details.totalDays)
          );
          const maxDaysPairs = newPairsData.filter(
            ([, details]) => details.totalDays === maxTotalDays
          );
          setMaxDaysPairs(maxDaysPairs);
        }

        setFileUploaded(true);
      } catch (error) {
        setErrors((prevErrors) => [...prevErrors, error.message]);
        console.log(errors);
      }
    };
  }
  const searchFunction = ([pairKey]) => {
    const lowerPairKey = pairKey.toLowerCase();

    return lowerPairKey.includes(searchTerm.toLowerCase());
  };

  // show filtered data unless input is empty
  const displayPairs =
    searchTerm.trim() === ""
      ? maxDaysPairs.length > 0
        ? maxDaysPairs
        : employeePairsData
      : employeePairsData.filter(searchFunction);

  return (
    <>
      <div className="App-center">
        <div className="upload-section">
          <label htmlFor="fileInput">Upload CSV file:</label>
          <input type="file" id="fileInput" onChange={handleUpload} />
        </div>

        {errors.length > 0 && (
          <div className="error-container">
            <h3>Error:</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {fileUploaded && (
          <>
            <Heading />
            <PairsDisplay
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              displayPairs={displayPairs}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
