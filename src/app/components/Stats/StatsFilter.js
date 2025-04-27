import { useState, useEffect } from "react";
import "./Stats.css";
import Slider from "@mui/material/Slider";

export default function StatsFilter({ table }) {

  const [columnRanges, setColumnRanges] = useState({});

  // State which columns can be sorted
  const numericColumns = [
    "form",
    "total_points",
    "now_cost",
    "goals_scored",
    "assists",
    "clean_sheets",
    "goals_conceded",
    "own_goals",
    "penalties_saved",
    "penalties_missed",
    "yellow_cards",
    "red_cards",
    "dreamteam_count",
    "points_per_game",
    "saves",
    "saves_per_90",
    "bonus",
    "expected_goals",
    "expected_assists",
    "expected_goal_involvements",
    "expected_goals_per_90",
    "expected_assists_per_90",
    "expected_goal_involvements_per_90",
    "expected_goals_conceded",
    "expected_goals_conceded_per_90",
  ];
  // Initialise range values
  useEffect(() => {
    const ranges = {};
    numericColumns.forEach((columnId) => {
      const values = table
        .getCoreRowModel()
        .rows.map((row) => row.getValue(columnId));
      const min = Math.min(...values);
      const max = Math.max(...values);

      ranges[columnId] = {
        min,
        max,
        value: [min, max],
      };
    });
    setColumnRanges(ranges);
  }, [table.getCoreRowModel().rows]);

  // Handles slider changes
  const handleChange = (columnId, event, newValue) => {
    const currentColumnRange = columnRanges[columnId];

    const updatedRange = {
      ...currentColumnRange,
      value: newValue,
    };

    const updatedColumnRanges = {
      ...columnRanges,
      [columnId]: updatedRange,
    };
    setColumnRanges(updatedColumnRanges);

    const column = table.getColumn(columnId);
    if (column) {
      column.setFilterValue(newValue);
    }
  };

  return (
    <div className="stats-filter-container">
      <h3>Filters</h3>
      <div className="stats-filter">
        {/* TanStack table method to render all columns in the table object  */}
        {table.getAllLeafColumns().map((column) => {
          if (!column.getCanHide()) return null;

          const range = columnRanges[column.id];
          const isVisible = column.getIsVisible(); // Check whether column is visible

          return (
            <div key={column.id} className="filter-item">
              <label className="visibility-toggle">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => column.toggleVisibility()} // Toggle column visibility
                />
                <span className="filter-text">{column.columnDef.header}</span>
              </label>

              {/* Render Slider if the column is visible, numeric, and has a range */}
              {isVisible && numericColumns.includes(column.id) && range ? (
                <div className="slider-container">
                  <Slider
                    value={range.value}
                    onChange={(event, newValue) => handleChange(column.id, event, newValue)}
                    valueLabelDisplay="auto"
                    min={range.min}
                    max={range.max}
                    // Specific formatting for now_cost to show correct currency
                    valueLabelFormat={
                      column.id === "now_cost"
                        ? (value) => `£${value / 10}m`
                        : (value) => value
                    }
                  />
                  <div className="range-values">
                    <span>
                      {column.id === "now_cost"
                        ? `£${range.value[0] / 10}m`
                        : range.value[0]}
                    </span>
                    <span>
                      {column.id === "now_cost"
                        ? `£${range.value[1] / 10}m`
                        : range.value[1]}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
