import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";
import './App.css';
import { detectAllFaces } from 'face-api.js';


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
  const play = () => {
    setInterval(async() => {
      if(isReady) {
        setIsReady(false);
      }
      canvas.current.innerHTML = faceapi.createCanvasFromMedia(video.current);

      const display = {
        width:720,
        height:560
      }
      faceapi.matchDimensions(canvas.current, display);
      const data = await detectAllFaces(video.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

      const resize = faceapi.resizeResults(data, display);

      canvas.current.getContext("2d").clearRect(0,0, display.width, display.height);

      faceapi.draw.drawDetections(canvas.current, resize);
      faceapi.draw.drawFaceLandmarks(canvas.current, resize);
      faceapi.draw.drawFaceExpressions(canvas.current, resize);

        console.log(data)
    },100)
  }

  return (
    <div className="App">
      <h1>{isReady? "ready" : "not ready"}</h1>
      <video width= "720" height="560" autoPlay muted ref={video} onPlay={play}/>
      <canvas width= "720" height="560" ref={canvas}/>
    </div>
  );

}

export default App;
