"use client";
import { useState } from "react";
import StatsTable from "./StatsTable";
import StatsFilter from "./StatsFilter";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import "./Stats.css";

export default function Stats({ playersData }) {
  const columnHelper = createColumnHelper();

  // Initialise columns
  const columns = [
    columnHelper.accessor("web_name", {
      header: "Name",
      enableHiding: false,
      enableColumnFilter: false,
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("element_type", {
      header: "Position",
      cell: ({ row }) => getPosition(row.original.element_type),
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("team", {
      header: "Team",
      cell: ({ row }) => getTeam(row.original.team),
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("form", {
      header: "Form",
    }),
    columnHelper.accessor("total_points", {
      header: "Points",
    }),
    columnHelper.accessor("now_cost", {
      header: "Price",
      cell: ({ row }) => `£${row.original.now_cost / 10}m`,
    }),
    columnHelper.accessor("goals_scored", {
      header: "Goals Scored",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("assists", {
      header: "Assists",
    }),
    columnHelper.accessor("clean_sheets", {
      header: "Clean Sheets",
    }),
    columnHelper.accessor("goals_conceded", {
      header: "Goals Conceded",
    }),
    columnHelper.accessor("own_goals", {
      header: "Own Goals",
    }),
    columnHelper.accessor("penalties_saved", {
      header: "Penalties Saved",
    }),
    columnHelper.accessor("penalties_missed", {
      header: "Penalties Missed",
    }),
    columnHelper.accessor("yellow_cards", {
      header: "Yellow Cards",
    }),
    columnHelper.accessor("red_cards", {
      header: "Red Cards",
    }),
    columnHelper.accessor("dreamteam_count", {
      header: "Dreamteam Count",
    }),
    columnHelper.accessor("points_per_game", {
      header: "Points Per Game",
    }),
    columnHelper.accessor("saves", {
      header: "Saves",
    }),
    columnHelper.accessor("saves_per_90", {
      header: "Saves per 90",
    }),
    columnHelper.accessor("bonus", {
      header: "Total bonus points",
    }),
    columnHelper.accessor("expected_goals", {
      header: "xG",
    }),
    columnHelper.accessor("expected_assists", {
      header: "xA",
    }),
    columnHelper.accessor("expected_goal_involvements", {
      header: "xGI",
    }),
    columnHelper.accessor("expected_goals_conceded", {
      header: "xGC",
    }),
    columnHelper.accessor("expected_goals_per_90", {
      header: "xG per 90",
    }),
    columnHelper.accessor("expected_assists_per_90", {
      header: "xA per 90",
    }),
    columnHelper.accessor("expected_goal_involvements_per_90", {
      header: "xGI per 90",
    }),
    columnHelper.accessor("expected_goals_conceded_per_90", {
      header: "xGC per 90",
    }),
  ];

  const [columnVisibility, setColumnVisibility] = useState({
    web_name: true,
    element_type: true,
    team: true,
    form: true,
    total_points: true,
    now_cost: true,
    goals_scored: true,
    assists: true,
    clean_sheets: true,
    goals_conceded: false,
    own_goals: false,
    penalties_saved: false,
    penalties_missed: false,
    yellow_cards: false,
    red_cards: false,
    dreamteam_count: false,
    points_per_game: false,
    saves: false,
    saves_per_90: false,
    bonus: false,
    expected_goals: false,
    expected_assists: false,
    expected_goal_involvements: false,
    expected_goals_per_90: false,
    expected_assists_per_90: false,
    expected_goal_involvements_per_90: false,
    expected_goals_conceded: false,
    expected_goals_conceded_per_90: false,
  });
  const [sorting, setSorting] = useState([]);

  // Initialise table
  const table = useReactTable({
    data: playersData,
    columns,
    // Retrieve rows
    getCoreRowModel: getCoreRowModel(),
    // Retrieve filtered rows (range slider)
    getFilteredRowModel: getFilteredRowModel(),
    // Retriever sorted columns
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
  });

  return (
    <div className="stats-container">
      <StatsTable table={table} />
      <StatsFilter table={table} />
    </div>
  );
}

function getPosition(elementType) {
  switch (elementType) {
    case 1:
      return "GK";
    case 2:
      return "DEF";
    case 3:
      return "MID";
    case 4:
      return "FWD";
    default:
      return "No position";
  }
}

function getTeam(team) {
  switch (team) {
    case 1:
      return "Arsenal";
    case 2:
      return "Aston Villa";
    case 3:
      return "Bournemouth";
    case 4:
      return "Brentford";
    case 5:
      return "Brighton";
    case 6:
      return "Chelsea";
    case 7:
      return "Crystal Palace";
    case 8:
      return "Everton";
    case 9:
      return "Fulham";
    case 10:
      return "Ipswich Town";
    case 11:
      return "Leicester City";
    case 12:
      return "Liverpool";
    case 13:
      return "Man City";
    case 14:
      return "Man Utd";
    case 15:
      return "Newcastle";
    case 16:
      return "Nottingham Forest";
    case 17:
      return "Southampton";
    case 18:
      return "Spurs";
    case 19:
      return "West Ham";
    case 20:
      return "Wolves";
    default:
      return "No team";
  }
}
