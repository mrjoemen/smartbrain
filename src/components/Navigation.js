import React from 'react';

function Navigation({ onRouteChange }) {
    return (
    <nav>
        <p 
        style = {{display: 'flex', justifyContent: "flex-end"}}
        className = "f3 link dim black underline pa3 pointer"
        onClick = {() => onRouteChange('signin')}>
        Sign Out
        </p>
    </nav>
    )
}

export default Navigation;