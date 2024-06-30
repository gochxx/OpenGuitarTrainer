/* beispielcode für synthesizer mit midi
benötigt: npm install tone

*/


import React from 'react';
import * as Tone from 'tone';

const SynthComponent = () => {
  // Erstelle eine Synthesizer-Instanz
  const synth = new Tone.Synth().toDestination();

  // Funktion zum Abspielen eines Tones
  const playNote = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  return (
    <div>
      <h1>Simple Synth</h1>
      <div>
        <button onClick={() => playNote('C4')}>C4</button>
        <button onClick={() => playNote('D4')}>D4</button>
        <button onClick={() => playNote('E4')}>E4</button>
        <button onClick={() => playNote('F4')}>F4</button>
        <button onClick={() => playNote('G4')}>G4</button>
        <button onClick={() => playNote('A4')}>A4</button>
        <button onClick={() => playNote('B4')}>B4</button>
        <button onClick={() => playNote('C5')}>C5</button>
      </div>
    </div>
  );
};

export default SynthComponent;
