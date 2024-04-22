function HorizontalLine() {
  return <div className="horizontal-line"></div>;
}


export default function Square() {
  var pattern = new Array(36);
  for (var i = 0; i < pattern.length; i++) {
    pattern[i] = 0; // Beispiel: Elemente mit Zahlen von 1 bis 36 füllen
  }
  pattern[7] = 1;
  pattern[9] = 2;

  return (<>    
    <div className="app">
      {/* Erstes Raster */}
      <div className="grid">
        {[...Array(30)].map((_, index) => (
          <div key={index} className="grid-item"></div>
        ))}
      </div>
      {/* Zweites Raster mit roten Kreisen */}
      <div className="overlay-grid">
        {pattern.map((value, index) => (
          <div key={index} className="grid-item-overlay">
            {value === 2 ? <RedCircle /> : (value === 1 ? <BlackCircle /> : null)}
          </div>
        ))}
      </div>
    </div>




</>);
}


const RedCircle = () => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50%" cy="50%" r="10" fill="red" />
    </svg>
  );
};

const BlackCircle = () => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50%" cy="50%" r="10" fill="black" />
    </svg>
  );
};

