import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";

import { detectAllFaces } from 'face-api.js';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from 'react-bootstrap/Spinner';


import ShowExpression from "../ShowExpression.js";

const getExpression = data => {
    let largest = {
        name: "none",
        value: 0
    };

    for ( let key in data ) {
        if( data[key] > largest.value ) 
        {
            largest.name = key
            largest.value = data[key]
        }
    }
    return largest.name;
}