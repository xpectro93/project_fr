import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";
import './App.css';
import { detectAllFaces } from 'face-api.js';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import ShowExpression from './ShowExpression.js'

const MODEL_URL = process.env.PUBLIC_URL + "models";

const getExpression = ( data ) => {
  let largest = {
    name: "none",
    value: 0
  }
  for( let key in data ) {
    if( data[key] > largest.value ) 
    {
      largest.name = key
      largest.value = data[key]
    }
  }
  return largest.name;
}


function App() {
  const [ isReady, setIsReady ] = useState(false);
  const [ data, setData ] = useState(null);

  const video = useRef(null);
  const canvas = useRef(null);
   useEffect(() => {
     console.log(video.current.width, canvas.current.width);

    const loadModels =  async () =>{
      
      setIsReady(currIsReady => !currIsReady);
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
        width:480,
        height:360
      }
      faceapi.matchDimensions(canvas.current, display);
      const data = await detectAllFaces(video.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

      const resize = faceapi.resizeResults(data, display);

      canvas.current.getContext("2d").clearRect(0,0, canvas.current.width, canvas.current.height);

      faceapi.draw.drawDetections(canvas.current, resize);
      faceapi.draw.drawFaceLandmarks(canvas.current, resize);
      faceapi.draw.drawFaceExpressions(canvas.current, resize);
      
      if(data[0]) {
        let dataExpresssions = data[0].expressions;
        let expression = getExpression(dataExpresssions);
        setData(expression);
        
        
      }
    },3000)
  }

  return (
    <Container>
        <Row> 
          <video width= "480" height="360" autoPlay muted ref={video} onPlay={play}/>
          <h1>{data}</h1>
          <canvas ref={canvas}/>
        </Row>

       {data !== null  ? 
       <Row>
          <ShowExpression expression= { data } />
       </Row>
        : "Loading this shiz"}

      
    </Container>
  );

}

export default App;