import React, { Component } from 'react';
import ChecklistItemModel from '../models/ChecklistItemModel';

function ChecklistItem(props) {
    return ( 
        <div>
            <input type="checkbox" name={props.name} value={props.name} />
            <label htmlFor={props.name}>{props.name}</label>
        </div>
    );
}

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        }

        console.log(JSON.stringify(this.state.items));

        this.addItem = this.addItem.bind(this);
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

    render() {
        var checklistList = this.state.items.map(function(item) {
            return <ChecklistItem key={item.id} name={item.name} />;
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