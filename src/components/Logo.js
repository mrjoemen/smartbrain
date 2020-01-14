import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'

function Logo() {
    return (
        <div className = "ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img 
                    alt = "smartbrain!" 
                    src= "https://img.icons8.com/bubbles/100/000000/brain.png"
                    style = {{paddingTop: '5px'}}></img> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;