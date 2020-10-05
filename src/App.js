import React, { useRef, useEffect } from 'react';
import useScript from "./useScript.js"
import faceapi from "./face-api.min.js";
import './App.css';


function App() {
  // const status = useScript(
  //   './face-api.min.js'
  // );

  const video = useRef(null);
   useEffect(() => {
    console.log('this is happening')
    navigator.getUserMedia(
     { video:{}},
      steam => video.current.srcObject = steam,
      err => console.error(err)
    )
  })

  return (
    <div className="App">
      <div>
        Script status: <b>{status}</b>
      </div>
      {status === "ready" ? 
      <div> 
         <video width= "720" height="560" autoPlay muted ref={video}>
         </video>


        
      </div> :<div>Its not ready</div>}
    </div>
  );

}

export default App;
