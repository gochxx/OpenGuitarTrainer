import React, { useState, useEffect } from 'react';

const BPM = 100;
const NOTE_DURATION = 0.25;
const TONIC_NOTE = 5;

const calculateScaleIndex = () => {
  const scaleIndex = [0,2,3,6,8,9,12,14,16,18,20,22,25,27,29,32,33,35];
  return scaleIndex;
};

const calculatePattern = () => {
  const pattern = new Array(18).fill().map((_, index) => index);
  return pattern;
};

const calculateScaleArray = (scaleIndex) => {
  const scale = new Array(36).fill(0);
  scaleIndex.forEach(index => scale[index] = 1);
  return scale;
};

const reverseRows = (array, width) => {
  const reversedArray = [];
  for (let i = 0; i < array.length; i += width) {
    const row = array.slice(i, i + width);
    reversedArray.unshift(...row);
  }
  return reversedArray;
};

const ScaleBox = () => {
  const [position, setPosition] = useState(0);

  const scaleIndex = calculateScaleIndex();
  const pattern = calculatePattern();
  const scaleArray = calculateScaleArray(scaleIndex);
  const displayArray = reverseRows(scaleArray, 6);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition(prevPosition => prevPosition + 1);
    }, (60000/((1/NOTE_DURATION) * BPM)));
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setArray(prevArray => {
      const newArray = [...prevArray];
      if (position > 0) {
        const oldIndex = scaleIndex[pattern[position - 1]];
        newArray[oldIndex] = 1;
      }
      const newIndex = scaleIndex[pattern[position]];
      newArray[newIndex] = 2;
      return newArray;
    });
  }, [position, pattern]);

  const tabDisplayArray = calculateTabDisplayArray(scaleIndex, pattern, position);

  return (
    <>
      {/* Dein JSX-Code hier */}
    </>
  );
};

const calculateTabDisplayArray = (scaleIndex, pattern, position) => {
  // Die Berechnung des Tab-Display-Arrays hier einfügen
};

// Weitere Hilfsfunktionen, Komponenten und die App-Komponente hier definieren

export default App;