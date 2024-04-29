'use client'
import React, { useState, useEffect } from 'react';

function ScaleBox() {
  
  var bpm = 100;
  var notenart = 0.25; // Achtel sind 0.25
  var tonart = 5; 

  // Scaleindex beschreibt die Position der Skale auf dem Griffbrett in einer 6x6 Box
  // Reihenfolge in Gitarrenlogik --> Scaleindex 0 ist die tiefste Note auf der E Seite
  var scaleindex = new Array ;
  scaleindex = [0,2,3,6,8,9,12,14,16,18,20,22,25,27,29,32,33,35];

  // Pattern: Das ist das Pattern, welches beschreibt wie der Array durchgespielt wird.
  var pattern = new Array(18);
  pattern = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  //pattern = [0,2,1,3,2,4,3,5,4,6,5,7,6,8,7,9,8,10,9,11,12,13,14,15,16,17]
  

  // Scale: Das enthält die Scale auf dem Griffbrett, wird aus Scaleindex berechnet
  // Bei Scale ist jeder der 36 Werte gefüllt, entweder mit 0 für leer oder mit 1 für Note
  var scale = new Array(36);
  for (var i = 0; i < scale.length; i++) {
    if (scaleindex.includes(i)) {
      scale[i] = 1; // Beispiel: Elemente mit Zahlen von 1 bis 36 füllen
    }
  }
  
  // Die Funktion zum Umkehren der Zeilen 
  // wird benötigt um aus Scale die Anzeigereihenfogle zu machen, da Scale umgekehrt ist (tiefe Seite oben)
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

  // zeitliche Array Änderung
  // Zustandsvariable für das Array
  const [array, setArray] = useState(scale);
  const [position, setPosition] = useState(0);

  // Effekt, der jede BPM ausgeführt wird um die Position zu ändern!
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Aktualisiere die Position um 1
      setPosition(prevPosition => prevPosition + 1);
    }, (60000/((1/notenart) * bpm))); // Das Interval-Intervall wird alle 1000 Millisekunden (1 Sekunde) aufgerufen
  
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



  /* tabdisplay */
  function tabdispArange(scaleindex, pattern, position, length) {
    const neuerArray = [];

    // erstmal zeilenweise auffüllen
    for (let i = 0; i < 6; i += 1) {
      let newValue = scaleindex[pattern[position + i]];
      let saite = 0;
      for (let u = newValue; u > 5; u -= 6){
        saite += 1;
        newValue = u-6;

      }
      for (let i=0; i<6; i+=1){
        if (i==saite) {neuerArray.push(newValue);}
        else {neuerArray.push(-1)}
      }
 
    }

    /* transponieren */
 
    let transposedArray = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        transposedArray.push(neuerArray[j * 6 + i]);
      }
    }



    //return neuerArray;
    return transposedArray;
  }
  var tabdisp = new Array(36);
  tabdisp = tabdispArange(scaleindex, pattern, position, 6);
  tabdisp = zeilenUmkehren(tabdisp, 6);


  return (<>    
    <div className="scalebox">
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
    
    
    <div className = "tabs">
      <div>
        <HorizontalLine />
        <HorizontalLine />
        <HorizontalLine />
        <HorizontalLine />
        <HorizontalLine />
        <HorizontalLine />
      </div>
      <div>
        <div className = "overlay-grid-tab">
        {
        
        tabdisp.map((value, index) => (
          <div key={index} className="grid-item-overlay">

          {(index % 6 === 0) ? (
            <span style={{ color: 'red' }}>{value > -1 ? (value + tonart) : null}</span>
          ) : (
            value > -1 ? (value + tonart) : null
          )}


       
          </div>
        ))
        
        
       
        
        }
        </div>
      </div>
    </div>

    {/*ELEMENTE DES ARRAY ZUM DEBUG ANZEIGEN 
    <div>
      {array.map((element, index) => (
        <p key={index}>Element {index + 1}: {element}</p>
      ))}
    </div>

    <div>
      <p align="center">{position}</p>
    </div>
      */
    }
  </>);
}


function App() {
  return (<>
    <div>
      <ScaleBox />
    </div>
  </>)
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


