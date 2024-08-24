import { Card, CardContent, Typography } from "@mui/material";
import { formatter } from "../utils/utils";

interface StatProps {
  companyName: string;
  value: number;
}

function Stat({ value, companyName }: StatProps): JSX.Element {
  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DA467D"
      }}
    >
      <CardContent>
        <Typography
          fontSize={22}
          variant="body1"
          fontWeight={"bold"}
          textAlign={"center"}
          color={"#DA467D"}
        >
          {formatter(value)}
        </Typography>
        <Typography
          sx={{ fontSize: 12 }}
          textAlign={"center"}
          color="#6e0136"
          gutterBottom
        >
          {companyName} full volume to last 30 days
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Stat;
