import React, {Component} from 'react';

export default class CharacterSelect extends Component {
    constructor(props){
        super(props);
        this.state = {
            topP1: '',
            topP2: '',
            topP3: '',
            topP4: '',
            topP5: '',
            topP6: '',
            topP7: '',
            topP8: ''

        }
    }

    render(){

        return(
            <div className="characterSelect">
                <div className="characterList container">
                    <div className="row">
                        <div className="drMario">
                            Dr Mario
                        </div>
                        <div className="mario">
                            Mario
                        </div>
                        <div className="luigi">
                            Luigi
                        </div>
                        <div className="bowser">
                            Bowser
                        </div>
                        <div className="peach">
                            Peach
                        </div>
                        <div className="yoshi">
                            Yoshi
                        </div>
                        <div className="dkong">
                            Donkey Kong
                        </div>
                        <div className="capFalcon">
                            Captain Falcon
                        </div>
                        <div className="ganondorf">
                            Ganondorf
                        </div>
                    </div>
                    <div className="row">
                        <div className="falco">
                            Falco
                        </div>
                        <div className="fox">
                            Fox
                        </div>
                        <div className="ness">
                            Ness
                        </div>
                        <div className="iceClimbers">
                            Ice Climbers
                        </div>
                        <div className="kirby">
                            Kirby
                        </div>
                        <div className="samus">
                            Samus
                        </div>
                        <div className="zelda">
                            Zelda
                        </div>
                        <div className="heroLink">
                            Link
                        </div>
                        <div className="youngLink">
                            Young Link
                        </div>
                    </div>
                    <div className="row">
                        <div className="pichu">
                            Pichu
                        </div>
                        <div className="pikachu">
                            Pikachu
                        </div>
                        <div className="jigglypuff">
                            Jigglypuff
                        </div>
                        <div className="mewtwo">
                            Mewtwo
                        </div>
                        <div className="mrgamewatch">
                            Mr Game and Watch
                        </div>
                        <div className="marth">
                            Marth
                        </div>
                        <div className="roy">
                            Roy
                        </div>
                    </div>
                </div>
                <div className="characterPlayerResult container">
                    <div className="row col-sm-12">
                        <div className="topP1 col-sm-3">
                            p1
                        </div>
                        <div className="topP2 col-sm-3">
                            p2
                        </div>
                        <div className="topP3 col-sm-3">
                            p3
                        </div>
                        <div className="topP4 col-sm-3">
                            p4
                        </div>
                    </div>
                    <div className="row col-sm-12">
                        <div className="topP5 col-sm-3">
                            p5
                        </div>
                        <div className="topP6 col-sm-3">
                            p6
                        </div>
                        <div className="topP7 col-sm-3">
                            p7
                        </div>
                        <div className="topP8 col-sm-3">
                            p8
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}