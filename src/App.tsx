import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale, Colors } from "chart.js";
import { Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import BarChart from "./assets/components/Charts/BarChart";
import ScatterChart from "./assets/components/Charts/ScatterChart";
import LineChart from "./assets/components/Charts/LineChart";
import Stat from "./assets/components/Stat";
import { colors, StockData } from "./assets/utils/utils";

import "./App.css";
import { Nav } from "./assets/components/Nav";

Chart.register(Colors);
Chart.register(CategoryScale);

function App() {
  const [data, setData] = useState<Array<StockData>>([]);
  
  const [chartData, setChartData] = useState({
    datasets: [] as {
      label: string;
      data: Array<number>;
      backgroundColor: string[];
    }[],
  });

  useEffect(() => {
    axios
      .get(`./data.json`, {
        params: {
          access_key: import.meta.env.VITE_API_KEY,
        },
      })
      .then(({ data }) => {
        setData(() => [...data.data]);
        setChartData(() => {
          const chartData = data.data;
          return {
            labels: chartData.map(({ symbol }: StockData) => symbol),
            datasets: [
              {
                label: "Volume",
                data: chartData.map(({ volume }: StockData) => {
                  return volume;
                }),
                backgroundColor: colors,
              },
            ],
          };
        });
      });
  }, []);

  return (
    <>
      <Nav />
      <Grid
        container
        justifyContent={"center"}
        spacing={4}
        sx={{ marginY: 5, marginX: 20 }}
      >
        <Grid xs={12}>
          {Object.keys(chartData).length > 0 ? (
            <>
              <BarChart chartData={chartData} />
            </>
          ) : (
            <>Loading</>
          )}
        </Grid>
        {data.length > 0
          ? data.map(({ volume, symbol }: StockData) => {
              return (
                <Grid key={symbol} xs={Math.floor(12 / data.length)}>
                  <Stat value={volume} companyName={symbol} />
                </Grid>
              );
            })
          : ""}
        {data.length > 0 ? (
          <Grid xs={6}>
            <Card
              variant="outlined"
              sx={{
                minHeight: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#DA467D",
              }}
            >
              <CardContent>
                <LineChart
                  title="Close values by Company (30 days)"
                  chartData={data}
                />
              </CardContent>
            </Card>
          </Grid>
        ) : (
          ""
        )}
        <Grid xs={6}>
          <Card
            variant="outlined"
            sx={{
              minHeight: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#DA467D",
            }}
          >
            <CardContent>
              <ScatterChart
                title="High and Low values by Company (30 days)"
                chartData={data}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
