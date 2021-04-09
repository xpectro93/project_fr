import React from 'react';

import { Link } from "react-router-dom";

const Navbar = () => {


    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/face-recognition">Face Recognition</Link>
            <Link to="/snek">Snek</Link>
        </div>
    )
}
export default Navbar;