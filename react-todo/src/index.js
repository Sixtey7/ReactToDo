import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './components/List';
import ChecklistItemModel from './models/ChecklistItemModel';

// =============================================
ReactDOM.render(
    <List items={populateInitialList()}/>,
    document.getElementById('root')
);

function populateInitialList() {
    var listToReturn = new Array(2);

    var firstItem = new ChecklistItemModel(0, "First Item");
    listToReturn[0] = firstItem;
    var secondItem = new ChecklistItemModel(1, "Second Item");
    listToReturn[1] = secondItem;

    return listToReturn;
}