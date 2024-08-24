import { Scatter } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { colors, StockData } from "../../utils/utils";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface ScatterChartInterface {
  chartData: Array<StockData>;
  title: string;
}

function ScatterChart({ chartData, title }: ScatterChartInterface) {
  const [scatterChartData, setScatterChartData] = useState<
    ChartData<"scatter", { x: number; y: number }[], unknown>
  >({
    datasets: [],
  });

  useEffect(() => {
    if (chartData) {
      setScatterChartData(() => {
        return {
          datasets: chartData.map(({ symbol, high, low }, index) => {
            const color = colors[index % colors.length];
            return {
              label: symbol,
              data: [
                {
                  x: high,
                  y: low,
                },
              ],
              backgroundColor: color,
              borderColor: color,
              pointRadius: 5,
            };
          }),
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
    >
      <Scatter
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label: function (tooltipItem: any) {
                  const label = tooltipItem.dataset.label || "";
                  const { x, y } = tooltipItem.raw as { x: number; y: number };
                  return [label, `High: ${x}`, `Low: ${y}`];
                },
              },
            },
            title: {
              display: true,
              text: title,
              color: "#CB0162",
            },
          },
        }}
        data={scatterChartData}
      />
    </Box>
  );
}

export default ScatterChart;
