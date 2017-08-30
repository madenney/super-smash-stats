import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

const PlayerChart = (props) => {
  if(props.game_data === ''){
    console.log('I am loading');
    return(
      <h1>Loading...</h1>
    )
  }
  const {game_data} = props;
  let matchData = {
    chartData: {
      labels: ['Games w/ Top 5', 'Games w/ Rank 6-25', 'Games w/ Rank 26-100', 'Games w/ Sub100'],
      datasets: [
        {
          label: 'Total Games Played',
          data: [
            game_data.games_vs_top5,
            game_data.games_vs_6_25,
            game_data.games_vs_26_100,
            game_data.games_vs_sub100
          ],
          backgroundColor: '#C12127'
        },
        {
          label: 'Total Games Won',
          data: [
            game_data.wins_vs_top5,
            game_data.wins_vs_6_25,
            game_data.wins_vs_26_100,
            game_data.wins_vs_sub100
          ],
          backgroundColor: '#FFDF06'
        }
      ]
    }
  }
  return(
    <div className='chart'>
      <Bar data={matchData.chartData} options = {
        {
          responsive: true,
          legend:{
            labels:{
              fontColor: 'white',
              fontSize: 14
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: 'white',
                fontSize: 14
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: 'white',
                fontSize: 10,
                stepSize: 1,
                beginAtZero: true
              }
            }]
          }
        }
      } />
    </div>
  )
}
export default PlayerChart;
