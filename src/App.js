import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const video = useRef(null);
  return (
    <div className="App">
      <video ref={video}>
        
      </video>
    </div>
  );
}

export default App;
