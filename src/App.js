import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";
import './App.css';


function App() {
  const [ isReady, setIsReady ] = useState(false);
  const video = useRef(null);
  const canvas = useRef(null);
   useEffect(() => {
    const loadModels = async () =>{
      const MODEL_URL = process.env.PUBLIC_URL + "models";
      setIsReady(!isReady);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(start);
    }
    loadModels();
   
  },[])

  const start = () => {
     navigator.getUserMedia(
     { video:{}},
      steam => video.current.srcObject = steam,
      err => console.error(err)
    )
  }

  return (
    <div className="App">
      <h1>{isReady? "ready" : "not ready"}</h1>
      <video width= "720" height="560" autoPlay muted ref={video}/>
    </div>
  );

}

export default App;
