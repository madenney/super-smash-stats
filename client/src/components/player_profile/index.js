import playerData from 'raw-loader!../../../data/test_data.txt';
import React, {Component} from 'react';
import  {Post} from 'react-axios';

class PlayerProfile extends Component {
    constructor(props) {
        super(props);

        var playerDataJSON = JSON.parse(playerData);
        this.gameData = playerDataJSON[2].data;

        this.playerStatsDict = {};

        this.gameData.forEach(game => {
            if (this.playerStatsDict[game.winner]) {
                this.playerStatsDict[game.winner].gamesWon++;
                this.playerStatsDict[game.winner].gamesPlayed++;
            }
            else {
                this.playerStatsDict[game.winner] = {
                    gamesWon: 1,
                    gamesPlayed: 1
                };
            }

            if (this.playerStatsDict[game.loser]) {
                this.playerStatsDict[game.loser].gamesPlayed++;
            }
            else {
                this.playerStatsDict[game.loser] = {
                    gamesWon: 0,
                    gamesPlayed: 1
                };
            }
        });

        for (var playerKey in this.playerStatsDict)
        {
            this.playerStatsDict[playerKey].gamesWonPercentage =
                this.playerStatsDict[playerKey].gamesWon / this.playerStatsDict[playerKey].gamesPlayed;

        }

        debugger;
    }


    render() {
        return (
        <div className="row">
            <div className="col">
                <div>Player Card Goes Here</div>
            </div>
            <div className="col">
                Table Body
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Winner</th>
                            <th>Loser</th>
                            <th>Score</th>
                            <th>Tournament</th>
                        </tr>
                    </thead>
                    {
                        this.gameData.map(game => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{game.id}</td>
                                        <td>{game.winner}</td>
                                        <td>{game.loser}</td>
                                        <td>{game.score}</td>
                                        <td>{game.tournament}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        </div>
        )
    }
}

    // axios.post('http://supersmashstats', {
    //
    // })
    // .then(function (response) {
    //     console.log(response);
    //     console.log('success!')
    // })
    // .catch(function(error) {
    //     console.log(error);
    // });

export default PlayerProfile;
