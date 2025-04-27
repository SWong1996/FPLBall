"use client";
import { ScatterChart } from "@mui/x-charts";
import { Card, CardContent, Typography } from "@mui/material";

export default function Scatter({ playersData }) {
  const filteredData = playersData
    .filter(
      (players) =>
        players.total_points > 100 &&
        players.element_type != 5 &&
        players.element_type != 1
    )
    .map((players) => ({
      x: players.expected_goals,
      y: players.expected_assists,
      name: players.web_name,
    }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" align="center">
          xG vs xA for Players &gt; 100 Points
        </Typography>
        <ScatterChart
          grid={{ vertical: true, horizontal: true }}
          height={300}
          series={[
            {
              data: filteredData,
              valueFormatter: (point) => {
                return `${point.name}: (xG: ${point.x}, xA: ${point.y})`;
              },
            },
          ]}
          xAxis={[{ label: "Expected Goals" }]}
          yAxis={[{ label: "Expected Assists" }]}
        />
      </CardContent>
    </Card>
  );
}
