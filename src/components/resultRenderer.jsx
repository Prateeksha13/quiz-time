import { Bar } from "react-chartjs-2";
import React from "react";

class ResultRenderer extends React.Component {
  render() {
    return (
      <Bar
        data={this.props.chartData}
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
