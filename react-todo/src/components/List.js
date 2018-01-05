import React, { Component } from 'react';
import ChecklistItemModel from '../models/ChecklistItemModel';
import './List.css';

function ChecklistItem(props) {
    return ( 
        <div>
            <input type="checkbox" name={props.name} value={props.name} onClick={props.onClick}/>
            <label htmlFor={props.name} className={props.checked ? "checked-entry" : ""}>{props.name}</label>
        </div>
    );
}

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //items: this.props.items
            items: new Array()
        }

        console.log(JSON.stringify(this.state.items));

        this.addItem = this.addItem.bind(this);
        this.itemClicked = this.itemClicked.bind(this);
    }
    
    getInitialState  = function (event){
        console.log('initial state called!');
    }

    getTodos(){
        return dispatch => {
            dispatch({type: 'HELLO_WORLD'}),
            fetch('http://localhost:3002/api/todo')
            .then(req => req.json())
            .then(json => console.log(json));
        }
    }

    componentDidMount() {
        console.log('component did mount called');
        this.props.dispatch(this.getTodos());
    }

    addItem(event) {
        console.log('Add Item Called!');

        var currentItems = this.state.items;

        var maxId = -1;
        currentItems.map(function(a) {
            if (a.id > maxId) {
                maxId = a.id;
            } 
        });

        console.log('determined max id to be: ' + maxId);

        if (this._inputElement.value !== "") {
            currentItems.push(new ChecklistItemModel(maxId + 1, this._inputElement.value));
        
            this.setState({
                items: currentItems
            });

            this._inputElement.value = "";
        }

        event.preventDefault();
    }

    itemClicked(clickedItemId) {
        console.log(clickedItemId + ' was clicked!');
        var currentItems = this.state.items;

        currentItems[clickedItemId].checked = !currentItems[clickedItemId].checked;

        console.log(JSON.stringify(currentItems));

        this.setState({
            items: currentItems
        });
    }

    render() {
        //TODO this feels like a hack, but need to capture the this I am referring to
        var outerThis = this;

        var checklistList = this.state.items.map(function(item) {
            return <ChecklistItem key={item.id} name={item.name} checked={item.checked} onClick={() => outerThis.itemClicked(item.id)}/>;
        });

        return (
            <div>
                <div>
                    { checklistList }
                </div>
                <form onSubmit={this.addItem}>
                    <input ref={(a) => this._inputElement = a} placeholder = "Enter Task">
                    </input>
                    <button type = "submit">add</button>
                </form>
            </div>
        );
    }
}

export default List;