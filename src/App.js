import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";
import './App.css';
import { detectAllFaces } from 'face-api.js';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'



import ShowExpression from './ShowExpression.js'

/////
import FRMain from "./faceRecognition/FRMain.js";
import Snek from "./snek/Main.js";


import { Switch, Route } from "react-router-dom";

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
  


  return (
   <div className={"App"}>
     <Switch>
      <Route exact path={"/face-recognition"}>
        <FRMain/>
      </Route>

      <Route exact path={"/snek"}>
      <Snek/>
      </Route>

    </Switch>
   </div>
    
    
  );

}

export default App;
