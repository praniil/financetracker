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

type Props = pieField & pieData;

const PieData: React.FC<Props> = ({ passPieField, passPieData }) => {
  console.log(passPieData);
  const { databaseField, setDatabaseField } = passPieField;
  const { databaseData, setDatabaseData } = passPieData;
  const data = {
    labels: databaseField,
    datasets: [databaseData],
  };

  interface pieObj {
    [key: string]: number;
  }

  const pieChartInfoObject = {} as pieObj;
  for (let i = 0; i < databaseField.length; i++) {
    let key: string = databaseField[i];
    let value: number = databaseData.data[i];
    pieChartInfoObject[key] = value;
  }

  const keys = Object.keys(pieChartInfoObject) as string[];
  const values = Object.values(pieChartInfoObject) as number[];

  console.log("pieChartInfoObject", pieChartInfoObject);
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
      <div>
        <Pie data={data} />
      </div>
      {showExpenditure ? (
        <div className="flex mt-2">
          <div className="text-sm rounded-sm text-black bg-white p-1 m-auto">
            Total: {expenditure}
          </div>
          <button
            className="text-xs rounded-sm text-white bg-blue-500 p-1 m-auto"
            onClick={toggleExpenditure}
          >
            Hide
          </button>
        </div>
      ) : (
        <button
          className="text-xs rounded-sm text-white bg-blue-500 p-1 m-4"
          onClick={toggleExpenditure}
        >
          Show Total Expenditure
        </button>
      )}
      <div>
        <h1 className="mt-4 text-lg font-bold">Your Expenditure Overview:</h1>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {keys.map((key, index) => (
            <p
              key={index}
              className={`py-1 px-2 rounded-md text-sm ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-200'
              }`}
            >{`${key}: ${values[index]}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieData;
