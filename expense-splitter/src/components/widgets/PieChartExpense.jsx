import { useEffect, useRef } from "react";

export default function PieChart() {
  // Create reference to dom elements
  const chartRef = useRef(null);


  useEffect(() => {
    const dataPie = {
      datasets: [
        {
          label: "Names",
          data: [40],
          backgroundColor: [
            "#05299e",
            "#761699",
            "#af008b",
            "#d80076",
            "#f4235d",
            "#ff5344",
            "#ffa600",
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