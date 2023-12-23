import "./PairDisplay.css";

const PairsDisplay = ({ searchTerm, setSearchTerm, displayPairs }) => {
  return (
    <div>
      <input
        id="search"
        type="text"
        placeholder="Search by employee ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {displayPairs.map(([pairKey, details]) => (
        <div key={pairKey} className="wrapper">
          <div className="pair-details">
            <div className="left-column">
              <p>
                Employees with IDs <span>{details.pair[0]}</span> and{" "}
                <span>{details.pair[1]} </span> have worked{" "}
                <span>{details.totalDays}</span> days together.
              </p>
            </div>
            <div className="right-column">
              <p>Common Projects:</p>
              <hr />
              {Object.entries(details.projects).map(([projKey, days]) => (
                <p key={projKey}>
                  Project {projKey}: <span>{days}</span> days
                </p>
              ))}
            </div>
          </div>
          <hr id="bold" />
        </div>
      ))}
    </div>
  );
};

export default PairsDisplay;
