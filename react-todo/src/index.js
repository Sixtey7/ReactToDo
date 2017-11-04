import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ChecklistItem(props) {
    return ( 
        <div>
            <input type="checkbox" name="{props.name}" value="{props.name}" />
            <label for="{props.name}">{props.name}</label>
        </div>
    );
}

// =============================================
ReactDOM.render(
    <ChecklistItem name="Hello"/>,
    document.getElementById('root')
);