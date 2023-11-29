import React, { useEffect, useState } from "react";
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
  console.log(passPieData);
  const { databaseField, setDatabaseField } = passPieField;
  const { databaseData, setDatabaseData } = passPieData;
  const data = {
    labels: databaseField,
    datasets: [databaseData],
  };
  const [expenditure, setExpenditure] = useState<number>(0);
  const [showExpenditure, setShowExpenditure] = useState<boolean>(false);

  let totalExpenditure = 0;
  for (let i = 0; i < databaseData.data.length; i++) {
    totalExpenditure = totalExpenditure + databaseData.data[i];
  }
  function toggleExpenditure() {
    setShowExpenditure(!showExpenditure);
    setExpenditure(totalExpenditure);
  }

  return (
    <div className="w-96 h-96 m-auto pt-10 flex flex-col">
      <Pie data={data} />
      {showExpenditure ? (
        <div className="flex mt-2"> 
          <div className=" text-sm  rounded-sm text-black bg-white-500 p-1 m-auto ">
            Total: {expenditure}
          </div>
          <button className="text-xs rounded-sm text-white bg-blue-500 p-1 m-auto" onClick={toggleExpenditure}> Hide </button>
        </div>
      ) : (
        <button
          className="text-xs rounded-sm text-white bg-blue-500 p-1 m-4"
          onClick={toggleExpenditure}
        >
          Show Total Expenditure
        </button>
      )}
    </div>
  );
};

export default PieData;
