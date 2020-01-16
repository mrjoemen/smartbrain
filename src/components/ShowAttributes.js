import React from 'react';

function ShowAttributes({ attributes }) {
    return (
        <div>

            <p className = 'center f3'>there is a {attributes.agePercent * 100}% chance that this person is {attributes.age}</p>
            <p className = 'center f3'>there is a {attributes.genderPercent * 100}% chance that this person is {attributes.gender}</p>
            <p className = 'center f3'>there is a {attributes.ethPercent * 100}% chance that this person is {attributes.eth}</p>
        </div>
    )
}

export default ShowAttributes;