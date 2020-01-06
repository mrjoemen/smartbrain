import React from 'react';

function FaceRecognition({ imgURL }) {
    return (
        <div className = "center ma">
            <div>
                <img alt = "" src = {imgURL} width = '500px' height = 'auto' ></img>
            </div>
        </div>
    )
};

export default FaceRecognition;