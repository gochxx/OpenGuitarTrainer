'use client'
import React, { useState, useEffect } from 'react';

function App() {
  
  
  var scaleindex = new Array ;
  scaleindex = [0,2,3,6,8,9,12,14,16,18,20,22,25,27,29,32,33,35];


  // Scale: Das enthält die Scale auf dem Griffbrett
  var scale = new Array(36);
  for (var i = 0; i < scale.length; i++) {
    if (scaleindex.includes(i)) {
      scale[i] = 1; // Beispiel: Elemente mit Zahlen von 1 bis 36 füllen
    }
  }
  
  // Die Funktion zum Umkehren der Zeilen
function zeilenUmkehren(array, breite) {
  const umgekehrterArray = [];
  for (let i = 0; i < array.length; i += breite) {
      const zeile = array.slice(i, i + breite);
      umgekehrterArray.unshift(...zeile);
  }
  return umgekehrterArray;
}

// Anzeigearray (der ist umgekehrt wie der Scale array, weil die Zeilen in HTML von oben nach unten gerendert werden)
var scaledisp = new Array(36);
// Die umgekehrten Zeilen erhalten
 scaledisp = zeilenUmkehren(scale, 6);



  // Pattern: Das ist das Pattern, welches beschreibt wie der Array durchgespielt wird.
  var pattern = new Array(18);
  //pattern = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  pattern = [0,2,1,3,2,4,3,5,4,6,5,7,6,8,7,9,8,10,9,11,12,13,14,15,16,17]
  //var position = 0;

  // zeitliche Array Änderung
  // Zustandsvariable für das Array
  const [array, setArray] = useState(scale);
  const [position, setPosition] = useState(0);

  // Effekt, der jede Sekunde ausgeführt wird um die Position zu ändern!
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Aktualisiere die Position um 1
      setPosition(prevPosition => prevPosition + 1);
    }, 1000); // Das Interval-Intervall wird alle 1000 Millisekunden (1 Sekunde) aufgerufen
  
    // Aufräumen, um das Intervall zu stoppen, wenn die Komponente unmontiert wird
    return () => clearInterval(intervalId);
  }, []); // Leeres Abhängigkeitsarray, damit dieser Effekt nur einmal beim ersten Rendern ausgeführt wird
  
  // Effekt, der bei jeder Änderung von "position" oder "pattern" aufgerufen wird
  useEffect(() => {
    // Hier wird das Array mit dem aktualisierten Wert von "position" aktualisiert
    setArray(prevArray => {
      const newArray = [...prevArray];
      if (position>0)
        {const oldIndex = scaleindex[pattern[position-1]];
          newArray[oldIndex] = 1;
        }
      const newIndex = scaleindex[pattern[position]];
      newArray[newIndex] = 2;
      return newArray;
    });
  }, [position, pattern]); // Füge "position" und "pattern" als Abhängigkeiten hinzu
  
  

  scaledisp = zeilenUmkehren(array, 6);





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
        {scaledisp.map((value, index) => (
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

    <div>
      <p align="center">{position}</p>
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


