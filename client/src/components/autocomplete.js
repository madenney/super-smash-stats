import React, { Component } from 'react';

export default class Autocomplete extends Component {


    render() {
        return (
            <datalist id="playersRec">
                {this.props.recommendations.map(function (item, index) {
                    return <option key={index} value={item.tag}/>
                })}
            </datalist>
        );
    }
};