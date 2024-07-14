import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import chartDataLables from "chartjs-plugin-datalabels";

export default function PieChart({ labels, datasets }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: datasets,
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex justify-content-center">
      {chartData && (
        <Chart
          type="pie"
          plugins={[chartDataLables]}
          data={chartData}
          options={chartOptions}
          className=" h-[40vh]"
        />
      )}
    </div>
  );
}

// const data = {
//     labels: ["A", "B", "C"],
//     datasets: [
//       {
//         data: [540, 325, 702],
//         backgroundColor: [
//           documentStyle.getPropertyValue("--blue-500"),
//           documentStyle.getPropertyValue("--yellow-500"),
//           documentStyle.getPropertyValue("--green-500"),
//         ],
//         hoverBackgroundColor: [
//           documentStyle.getPropertyValue("--blue-400"),
//           documentStyle.getPropertyValue("--yellow-400"),
//           documentStyle.getPropertyValue("--green-400"),
//         ],
//       },
//     ],
//   };
