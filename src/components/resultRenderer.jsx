import { Bar } from "react-chartjs-2";
import React from "react";

class ResultRenderer extends React.Component {
  render() {
    let chartData = {
      labels: ["Correct Answers", "Incorrect Answers"],
      datasets: [
        {
          label: "Quiz Results",
          backgroundColor: [
            "rgba(146, 192, 104, 0.9)",
            "rgba(226, 64, 64, 0.9)"
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            "rgba(146, 192, 104, 0.6)",
            "rgba(226, 64, 64, 0.6)"
          ],
          data: this.props.resultData
        }
      ]
    };
    return (
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
      />
    );
  }
}

export default ResultRenderer;
