import { Box, Divider, Typography } from "@mui/material";

export function Nav() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        textAlign={"center"}
        marginY={5}
        fontSize={18}
        fontWeight={"bold"}
        color="#CB0162"
      >
        Metrics Dashboard for Tech Companies (last 30 days){" "}
        <Typography variant="subtitle1" color="#DA467D">
          Apple, Alibaba, Amazon, Microsoft and Google
        </Typography>
      </Typography>
      <Divider sx={{ backgroundColor: "#FFBACD" }} />
    </Box>
  );
}
