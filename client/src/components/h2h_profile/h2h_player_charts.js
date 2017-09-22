import React from "react";
import { Bar } from "react-chartjs-2";

const H2HPlayerChart = props => {
  if (props.game_data === []) {
    return <h1>Loading...</h1>;
  }

  const { game_data, player1, player2 } = props;
  const year_label = [],
    player1_data = [],
    player2_data = [];
  game_data.forEach(game => {
    year_label.push(game.year);
    player1_data.push(game.p1Wins);
    player2_data.push(game.p2Wins);
  });

  let chartData = {
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
  };

  return (
    <div className="chart">
      <Bar
        data={chartData}
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
