import React from "react";
import { Bar } from "react-chartjs-2";

const H2HPlayerChart = props => {
  if (props.game_data === []) {
    return <h1>Loading...</h1>;
  }
  const { game_data, player1, player2 } = props;
  const year_label = [];
  const player1_data = [];
  const player2_data = [];
  for (var i = 0; i < game_data.length; i++) {
    year_label.push(game_data[i].year);
    player1_data.push(game_data[i].p1Wins);
    player2_data.push(game_data[i].p2Wins);
  }
  let matchData = {
    chartData: {
      labels: year_label,
      datasets: [
        {
          label: `${player1.tag} Wins`,
          data: player1_data,
          backgroundColor: "#C12127"
        },
        {
          label: `${player2.tag} Wins`,
          data: player2_data,
          backgroundColor: "#FFDF06"
        }
      ]
    }
  };
  return (
    <div className="chart">
      <Bar
        data={matchData.chartData}
        options={{
          maintainAspectRatio: true,
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 14
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: "white",
                  fontSize: 14
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "white",
                  fontSize: 10,
                  stepSize: 1,
                  beginAtZero: true
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};
export default H2HPlayerChart;
