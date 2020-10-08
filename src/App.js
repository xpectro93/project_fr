import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";
import './App.css';
import { detectAllFaces } from 'face-api.js';

import ShowExpression from './ShowExpression.js'

const MODEL_URL = process.env.PUBLIC_URL + "models";

function App() {
  const [ isReady, setIsReady ] = useState(false);
  const [ data, setData ] = useState(null);

  const video = useRef(null);
  const canvas = useRef(null);
   useEffect(() => {
    const loadModels =  async () =>{
      
      setIsReady(!isReady);
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ])
      start ();
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

      canvas.current.getContext("2d").clearRect(0,0, canvas.current.width, canvas.current.height);

      faceapi.draw.drawDetections(canvas.current, resize);
      faceapi.draw.drawFaceLandmarks(canvas.current, resize);
      faceapi.draw.drawFaceExpressions(canvas.current, resize);
      
      if(data[0]) {
        setData(data[0].expressions);

      }
      console.log(data);
    },300)
  }

  return (
    <div className="App">
        <div id="faceWrapper"> 
          <video width= "720" height="560" autoPlay muted ref={video} onPlay={play}/>
          <canvas ref={canvas}/>
        </div>

       <ShowExpression expressions= { data } />

      
    </div>
  );

}

export default App;
