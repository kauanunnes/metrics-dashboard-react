export const formatter = (value: number) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const colors = [
  "#FFBACD", // Banging Pastel Pink
  "#DA467D", // Extravert Darkish Pink
  "#CB0162", // Tuppenny Deep Pink
  "#FFD1BA", // Mellow Peach
  "#BCA2FF", // Serene Lavender
];

export interface StockData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_high: number;
  adj_low: number;
  adj_close: number;
  adj_open: number;
  adj_volume: number;
  split_factor: number;
  dividend: number;
  symbol: string;
  exchange: string;
  date: string;
  [key: string]: number | string;
}



export const formatData = (chartData: Array<StockData>, keys: Array<string>) => {
  console.log(keys)
  const datasets = keys.map(item => {
    return {
      data: chartData.map((value)=> {
        return value[item]
      }),
      backgroundColor: colors,
    }
  })
  return {
    labels: chartData.map(({ symbol }: StockData) => symbol),
    datasets: [
      ...datasets
    ],
  };
};
