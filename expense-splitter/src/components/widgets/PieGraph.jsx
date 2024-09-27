import { useEffect, useRef } from "react";

export default function PieGraph({ labels, label, data }) {
  // Create reference to dom elements
  const chartRef = useRef(null);

  useEffect(() => {
    const dataPie = {
      labels: labels,
      //   labels: ["JavaScript", "Python", "Ruby"],
      datasets: [
        {
          label,
          data,
          backgroundColor: [
            "#ffd373",
            "#fd8021",
            "#e05400",
            "#0073cc",
            "#003488",
            "#001d59",
            "#001524",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configPie = {
      type: "pie",
      data: dataPie,
      options: {},
    };

    const pieChart = new Chart(chartRef.current, configPie);

    // Cleanup the chart on component unmount
    return () => {
      pieChart.destroy();
    };
  });

  return (
    <div className="mx-auto max-w-sm overflow-hidden lg:max-w-lg">
      <canvas className="p-4" ref={chartRef}></canvas>
    </div>
  );
}
