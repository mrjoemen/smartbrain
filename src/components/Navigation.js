import React from 'react';

function Navigation() {
    return (
    <nav>
        <p 
        style = {{display: 'flex', justifyContent: "flex-end"}}
        className = "f3 link dim black underline pa3 pointer">
        Sign Out
        </p>
    </nav>
    )
}

export default Navigation;