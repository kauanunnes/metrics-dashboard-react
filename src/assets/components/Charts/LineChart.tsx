import { Box } from "@mui/material";
import { isNumber } from "chart.js/helpers";
import { Line } from "react-chartjs-2";
import { formatter, StockData, colors } from "../../utils/utils";
import { useEffect, useState } from "react";

interface LineChartProps {
  chartData: Array<StockData>;
  title: string;
}

function LineChart({ chartData, title }: LineChartProps) {
  const [lineData, setLineData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string[] }[];
  }>({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    if (chartData) {
      setLineData(() => {
        return {
          labels: chartData.map(({ symbol }: StockData) => symbol),
          datasets: [
            {
              label: "Close",
              data: chartData.map(({ close }: StockData) => {
                return close;
              }),
              backgroundColor: colors,
            },
          ],
        };
      });
    }
  }, [chartData]);
  return (
    <Box
      maxHeight={400}
      minWidth={500}
      display={"flex"}
      justifyContent={"center"}
      marginBottom={3}
      paddingY={6.5}
    >
      <Line
        data={lineData}
        options={{
          scales: {
            x: {
              grid: {
                display: false, // Hide grid lines on the x-axis
              },
              ticks: {
                color: "#DA467D"
              }
            },
            y: {
              ticks: {
                color: "#DA467D"
              }
            }
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
              text: title,
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
export default LineChart;
