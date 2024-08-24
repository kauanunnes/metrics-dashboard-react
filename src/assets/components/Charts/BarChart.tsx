import { Box } from "@mui/material";
import { isNumber } from "chart.js/helpers";
import { Bar } from "react-chartjs-2";
import { formatter } from "../../utils/utils";
import { ChartData } from "chart.js";

interface BarChartProps {
  chartData: ChartData<"bar", (number | [number, number] | null)[], unknown>;
}

function BarChart({ chartData }: BarChartProps) {
  console.log(chartData);
  return (
    <Box
      maxHeight={400}
      display={"flex"}
      justifyContent={"center"}
      marginBottom={3}
    >
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              grid: {
                display: false, // Hide grid lines on the x-axis
              },
              ticks: {
                color: "#DA467D",
              },
            },
            y: {
              ticks: {
                color: "#DA467D",
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  let label = tooltipItem.dataset.label || "";

                  if (label) {
                    label += ": ";
                  }
                  label += `${
                    isNumber(tooltipItem.raw)
                      ? formatter(tooltipItem.raw)
                      : "$0"
                  }`;
                  return label;
                },
              },
            },
            title: {
              display: true,
              text: "Volume for last 30 days",
              color: "#CB0162",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </Box>
  );
}
export default BarChart;
