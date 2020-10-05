import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import objectDetectionSketch from './sketch/ObjectDetectionSketch';

export default class AppContainer extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {
        return (<P5Wrapper  sketch={(p) => objectDetectionSketch(p)} />
        )
    }
}