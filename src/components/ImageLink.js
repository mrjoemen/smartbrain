import React from 'react';
import './ImageLink.css'

function ImageLink() {
    return (
        <div>
            <p className = 'f3 center'>
                {'this magic brain will detect emotions in your image, give it a try'}
            </p>
            <div className = 'center'>
                <div className = 'center form pa4 br3 shadow-5'>
                    <input type='text' className = 'f4 pa2 w-70 center'/>
                    <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-blue'>detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLink;