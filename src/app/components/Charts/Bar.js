"use client";
import { BarChart } from "@mui/x-charts";
import { Card, CardContent, Typography } from "@mui/material";

export default function Bar({ playersData }) {
  // Filter and map the data by team and goals
  const filteredData = playersData
    .filter((player) => player.goals_scored > 0)
    .map((player) => ({
      team: getTeam(player.team),
      goals: player.goals_scored,
    }));

  // Group by team and add up the goals for each player per team
  const teamGoals = new Map();

  filteredData.forEach((player) => {
    const { team, goals } = player;
    if (!teamGoals.has(team)) {
      teamGoals.set(team, 0);
    }
    teamGoals.set(team, teamGoals.get(team) + goals);
  });
  // Dataset for the chart
  const data = Array.from(teamGoals, ([team, goals]) => ({
    team,
    goals,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" align="center">
          Goals by Team
        </Typography>
        <BarChart
          dataset={data}
          yAxis={[
            {
              label: "Goals",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "team",
            },
          ]}
          series={[
            {
              dataKey: "goals",
            },
          ]}
          height={600}
        />
      </CardContent>
    </Card>
  );
}

function getTeam(team) {
  switch (team) {
    case 1:
      return "ARS";
    case 2:
      return "AVL";
    case 3:
      return "BOU";
    case 4:
      return "BRE";
    case 5:
      return "BHA";
    case 6:
      return "CHE";
    case 7:
      return "CRY";
    case 8:
      return "EVE";
    case 9:
      return "FUL";
    case 10:
      return "IPS";
    case 11:
      return "LEI";
    case 12:
      return "LIV";
    case 13:
      return "MCI";
    case 14:
      return "MUN";
    case 15:
      return "NEW";
    case 16:
      return "NFO ";
    case 17:
      return "SOU";
    case 18:
      return "TOT";
    case 19:
      return "WHU";
    case 20:
      return "WOL";
  }
}
