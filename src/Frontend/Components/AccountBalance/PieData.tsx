import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { usePieDataContext } from "./NewRecord";

export function fetchPieData() {
  console.log("in piedata fetch");
}

const PieData = () => {
  const context = usePieDataContext();
  
  if (!context) {
    console.log("context:", context);
    return <div>No data available</div>;
  }

  const { databaseField, databaseData } = context;
  const data = {
    labels: databaseField,
    datasets: [databaseData],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieData;
