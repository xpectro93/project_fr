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
import Navbar from "./Navbar.js";

import { Switch, Route } from "react-router-dom";

const MODEL_URL = process.env.PUBLIC_URL + "models";



function App() {
  


  return (
   <div className={"App"}>
     <Navbar/>
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
