import React from 'react';
import "./FaceRecognition.css"

function FaceRecognition({ imgURL, box }) {
    return (
        <div className = "center ma">
            <div className='absolute mt2'> {/*make sure to include this tachyon to ensure the box will be on the image*/}
                <img id = 'inputimage' alt = "" src = {imgURL} width = '500px' height = 'auto' ></img>
                <div className ='bounding-box' style = {{top: box.topRow, right: box.rightColumn, bottom: box.bottomRow, left: box.leftColumn}}></div>
            </div>
        </div>
    )
};

export default FaceRecognition;