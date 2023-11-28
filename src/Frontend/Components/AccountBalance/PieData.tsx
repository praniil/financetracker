import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

interface pieField {
  passPieField: {
    databaseField: string[];
    setDatabaseField: React.Dispatch<React.SetStateAction<string[]>>;
  };
}
interface pieData {
  passPieData: {
    databaseData: {
      data: number[];
      backgroundColor: string[];
    };
    setDatabaseData: React.Dispatch<
      React.SetStateAction<{
        data: number[];
        backgroundColor: string[];
      }>
    >;
  };
}
type props = pieField & pieData;

const PieData: React.FC<props> = ({ passPieField, passPieData }) => {
  const { databaseField, setDatabaseField } = passPieField;
  const { databaseData, setDatabaseData } = passPieData;
  const data = {
    labels: databaseField,
    datasets: [databaseData],
  };

  return (
    <div>
      hey
      <Pie data={data} />
      
    </div>
  );
};

export default PieData;
