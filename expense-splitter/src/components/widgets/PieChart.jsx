import { useEffect, useRef } from "react";

export default function PieChart({ label, pieData }) {
  // Create reference to dom elements
  const chartRef = useRef(null);

  const labels = Object.keys(pieData);
  const data = Object.values(pieData);

  useEffect(() => {
    const dataPie = {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: [
              //light purple
            "#C5AED0",
            "#AF96C0",
            "#997EB0",
            "#8366A0",
            "#6C4E90",
              //dark purple
            "#803C77",
            "#723369",
            "#642A5C",
            "#56214E",
            "#481841",
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
    <div className="mx-auto aspect-square max-w-sm overflow-hidden lg:max-w-lg">
      <canvas className="p-4" ref={chartRef}></canvas>
    </div>
  );
}
