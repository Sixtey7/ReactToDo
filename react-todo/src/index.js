import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './components/List';
import ChecklistItemModel from './models/ChecklistItemModel';

// =============================================
ReactDOM.render(
    //<List items={populateInitialList()}/>,
    <List />,
    document.getElementById('root')
);

async function populateInitialList() {
    await fetch('http://localhost:3002/api/todo') 		
    .then(result=>result.json())
    .then(items=> {
        let listToReturn = new Array(items.length);
        for (let x = 0; x < items.length; x++) {
            let newItem = new ChecklistItemModel(items[x].id, items[x].name);
            listToReturn[x] = newItem;
        }
        console.log('all done!');
        return listToReturn;
    });
}
/*
    var listToReturn = new Array(2);

    var firstItem = new ChecklistItemModel(0, "First Item");
    listToReturn[0] = firstItem;
    var secondItem = new ChecklistItemModel(1, "Second Item");
    listToReturn[1] = secondItem;

    return listToReturn;*/