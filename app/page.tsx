'use client'
import React, { useState, useEffect } from 'react';

function App() {
  var pattern = new Array(36);
  for (var i = 0; i < pattern.length; i++) {
    pattern[i] = 0; // Beispiel: Elemente mit Zahlen von 1 bis 36 füllen
  }
  pattern[7] = 1;
  pattern[9] = 2;


  // zeitliche Array Änderung
    // Zustandsvariable für das Array
    const [array, setArray] = useState(pattern);

    // Effekt, der jede Sekunde aufgerufen wird und das Array aktualisiert
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Hier kannst du das Array auf die gewünschte Weise aktualisieren
        setArray(prevArray => {
          // Zum Beispiel: Das erste Element wird ans Ende verschoben
          const newArray = [...prevArray];
          const firstElement = newArray.shift();
          newArray.push(firstElement);
          return newArray;
        });
      }, 1000); // Alle 1000 Millisekunden (1 Sekunde) aktualisieren
  
      // Aufräumen, um das Intervall zu stoppen, wenn die Komponente unmontiert wird
      return () => clearInterval(intervalId);
    }, []); // Leeres Abhängigkeitsarray, damit dieser Effekt nur einmal beim ersten Rendern ausgeführt wird
  

pattern = array;





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

    <div>
      {array.map((element, index) => (
        <p key={index}>Element {index + 1}: {element}</p>
      ))}
    </div>

</>);
}

export default App; 

function HorizontalLine() {
  return <div className="horizontal-line"></div>;
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


