import React from 'react';
import './App.css';


import FRMain from "./faceRecognition/FRMain.js";
import Snek from "./snek/Main.js";
import Navbar from "./Navbar.js";

import { Switch, Route } from "react-router-dom";

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
