function HorizontalLine() {
  return <div className="horizontal-line"></div>;
}


export default function Square() {
  return (<>    
    <div className="app">
      {/* Erstes Raster */}
      <div className="grid">
        {[...Array(25)].map((_, index) => (
          <div key={index} className="grid-item"></div>
        ))}
      </div>
      {/* Zweites Raster mit roten Kreisen */}
      <div className="overlay-grid">
        {[...Array(30)].map((_, index) => (
          <div key={index} className="grid-item-overlay">
            <RedCircle />
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

