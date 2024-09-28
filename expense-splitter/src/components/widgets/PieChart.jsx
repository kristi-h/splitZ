import { useEffect, useRef } from "react";

export default function PieChart({ label, slices }) {
  // Create reference to dom elements
  const chartRef = useRef(null);

  const sortedLabels = [...new Set(slices)].sort();

  function calculateSlicePercentages(slices) {
    // count the occurrences of each category
    const sliceCount = slices.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    // console.log(sliceCount);

    // calculate the total number of slices
    const total = slices.length;

    // calculate the percentages for each slice
    const percentages = sortedLabels.map((slice) => {
      //   console.log(Math.round((sliceCount[slice] / total) * 100));
      return Math.round((sliceCount[slice] / total) * 100);
    });

    return percentages;
  }

  const data = calculateSlicePercentages(slices);

  useEffect(() => {
    const dataPie = {
      labels: sortedLabels,
      //   labels: ["JavaScript", "Python", "Ruby"],
      datasets: [
        {
          label,
          data,
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
