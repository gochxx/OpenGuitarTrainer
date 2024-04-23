'use client'
import React, { useState, useEffect } from 'react';

function App() {
  
  // Scale: Das enthält die Scale auf dem Griffbrett
  var scale = new Array(36);
  for (var i = 0; i < scale.length; i++) {
    scale[i] = 0; // Beispiel: Elemente mit Zahlen von 1 bis 36 füllen
  }
  
  scale[2] = 2;
  scale[3] = 1;
  scale[5] = 1;
  scale[7] = 1;
  scale[9] = 1;
  scale[11] = 1;
  scale[12] = 1;
  scale[14] = 1;
  scale[16] = 1;
  scale[18] = 1;
  scale[20] = 1;
  scale[22] = 1;
  scale[24] = 1;
  scale[26] = 1;
  scale[27] = 1;
  scale[30] = 1;
  scale[32] = 1;
  scale[33] = 1;

  var scaleindex = new Array ;
  scaleindex = [2,3,5,7,9,11,12,14,16,18,20,22,24,26,27,30,32,33];

  // Pattern: Das ist das Pattern, welches beschreibt wie der Array gefüllt wird.
  var pattern = new Array(18);
  pattern = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  var position = 0;

  // zeitliche Array Änderung
  // Zustandsvariable für das Array
  const [array, setArray] = useState(scale);

  // Effekt, der jede Sekunde aufgerufen wird und das Array aktualisiert
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Hier kannst du das Array auf die gewünschte Weise aktualisieren
      setArray(prevArray => {
        // Zum Beispiel: Das erste Element wird ans Ende verschoben
        const newArray = [...prevArray];

        var newIndex = scaleindex[pattern[position]];
        newArray[newIndex]=2;
        position = position + 1;
        /*
        var found:int=0;
        //for (var i = newArray.length; i == 0;  i--) {
        for (var i = 0; i < newArray.length; i++) {
          if (newArray[i] === 2 && found === 0){
            newArray[i] = 1; // Beispiel: Elemente mit Zahlen von 1 bis 36 füllen
            
            // nächsten roten Punkt suchen
            for (var u = i; u<newArray.length; u++){
              if ((newArray[u]===1) && (found===0)){
                newArray[u]=2;
                found=1;
              }
            }
          }
        }*/
        /*const firstElement = newArray.shift();
        newArray.push(firstElement);*/
        return newArray;
      });
    }, 1000); // Alle 1000 Millisekunden (1 Sekunde) aktualisieren

    // Aufräumen, um das Intervall zu stoppen, wenn die Komponente unmontiert wird
    return () => clearInterval(intervalId);
  }, []); // Leeres Abhängigkeitsarray, damit dieser Effekt nur einmal beim ersten Rendern ausgeführt wird
  

  scale = array;





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
        {scale.map((value, index) => (
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


