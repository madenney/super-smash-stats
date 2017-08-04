import React, { Component } from 'react';

class Truncate extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: 'something',
            totalPages: 'something',
        }
    }

    render() {
        const {currentPage, totalPages} = this.state;

        const truncateStyle = () => {
            switch (currentPage) {
                case (currentPage < 3):
                    return 'lessthan3';
                    break;
                case (currentPage > 3 && currentPage < totalPages - 3):
                    return 'inbetween';
                    break;
                case (currentPage > totalPages - 4):
                    return 'nearend';
                    break;
            }
        }

        return (
                {truncateStyle}
        )
    }
}

export default Truncate;