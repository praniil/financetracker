import React, { useContext, useEffect, createContext } from "react";
import { useState } from "react";
//npm uninstall react-chartjs-2 chart.js
// npm install react-chartjs-2@latest chart.js@latest
import PieData from "./PieData";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

interface balanceInterface {
  passBalance: {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
  };
}
interface recordInterface {
  passRecord: {
    newRecord: {
      typeNew: string;
      amount: number;
      category: string;
    };
    setNewRecord: React.Dispatch<
      React.SetStateAction<{
        typeNew: string;
        amount: number;
        category: string;
      }>
    >;
  };
}
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
type props = balanceInterface & recordInterface & pieField & pieData;

const NewRecord: React.FC<props> = ({
  passBalance,
  passRecord,
  passPieField,
  passPieData,
}) => {
  // interface newRecord {
  //   typeNew: string;
  //   amount: number;
  //   category: string;
  // }
  const { balance, setBalance } = passBalance;
  const { newRecord, setNewRecord } = passRecord;
  const { databaseField, setDatabaseField } = passPieField;
  const { databaseData, setDatabaseData } = passPieData;
  // const [newRecord, setNewRecord] = useState<newRecord>({
  //   typeNew: "INCOME",
  //   amount: 0,
  //   category: "Income",
  // });

  const expenseType: string[] = ["INCOME", "Expense"];
  const category: string[] = [
    "Income",
    "Clothes & Shoes",
    "Food & Drinks",
    "Rent",
    "Shopping",
    "Transportation",
    "Vehicle",
    "Life & Entertainment",
    "Communication & PC",
    "Electronics",
    "Other",
  ];

  function handleRecordChange(event: any) {
    const { name, value } = event.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  }

  //piechart

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  interface pieData {
    data: number[];
    backgroundColor: string[];
  }

  const [fields, setFields] = useState<string[]>([newRecord.category]);
  //state for the database
  // const [databaseField, setDatabaseField] = useState<string[]>([]);
  // const [databaseData, setDatabaseData] = useState<pieData>({
  //   data: [],
  //   backgroundColor: [getRandomColor()],
  // });
  const [dataset, setDataset] = useState<pieData>({
    data: [newRecord.amount],
    backgroundColor: [getRandomColor()],
  });

  const fetchUpdateBalance = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/get-balance");
      const updateBalance = response.data.balance;
      setBalance(updateBalance);
    } catch (error) {
      console.error("Error fetching updated balance: ", error);
    }
  };
  interface PieData {
    [key: string]: string[];
  }
  const fetchDatabaseData = async () => {
    console.log("in fetchDatabaseData");
    try {
      const response = await axios.get("http://localhost:8080/api/get-field");
      const updateFieldData: PieData = response.data.data;

      const keys = Object.keys(updateFieldData) as string[];
      const values = Object.values(updateFieldData).flat() as string[];
      setDatabaseField(keys);
      setDatabaseData((prevData) => ({
        ...prevData,
        data: values.map((val) => parseInt(val, 10)), // Convert strings to numbers
        backgroundColor: [...prevData.backgroundColor, getRandomColor()],
      }));
    } catch (error) {
      console.error("error fetching database fields in newRecords", error);
    }
  };
  useEffect(() => {
    fetchUpdateBalance();
    fetchDatabaseData();
  }, [balance, databaseData, databaseField]);

  async function handleAddRecord(event: React.FormEvent) {
    event.preventDefault();

    // Check if it's an expense or income
    if (newRecord.typeNew === expenseType[0]) {
      try {
        console.log("in try");
        const response = await axios.post(
          "http://localhost:8080/api/update-balance",
          {
            userBalance: Number(balance) + Number(newRecord.amount),
          }
        );
        console.log("response", response);
        if (response.status === 200) {
          fetchUpdateBalance();
        } else {
          console.error("Failed to update balance");
        }
      } catch (error) {
        console.error("An error occurred while updating balance: ", error);
      }
    } else {
      //balance table update
      console.log("here");
      console.log(balance);
      console.log(newRecord.amount);
      if (Number(balance) >= Number(newRecord.amount)) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/update-balance",
            {
              userBalance: Number(balance) - Number(newRecord.amount),
            }
          );
          console.log("response", response);
          if (response.status === 200) {
            fetchUpdateBalance();
          } else {
            console.error("Failed to update balance");
          }
        } catch (error) {
          console.error("An error occurred while updating balance: ", error);
        }

        const categoryIndex = fields.indexOf(newRecord.category);

        if (categoryIndex !== -1) {
          // If category already exists, update the existing dataset
          setDataset((prevDataset) => {
            const newData = [...prevDataset.data];
            newData[categoryIndex] =
              Number(newData[categoryIndex]) + Number(newRecord.amount);

            return {
              data: newData,
              backgroundColor: prevDataset.backgroundColor,
            };
          });
          const response = await axios.post(
            "http://localhost:8080/api/update-field",
            {
              fields: fields,
              data: dataset.data,
            }
          );
          if (response.status === 200) {
            fetchDatabaseData();
          } else {
            console.error("failed to update the field and data of piechart");
          }
        } else {
          // If category does not exist, add a new category and update the dataset
          setFields((prevFields) => [...prevFields, newRecord.category]);
          setDataset((prevDataset) => ({
            data: [...prevDataset.data, newRecord.amount],
            backgroundColor: [...prevDataset.backgroundColor, getRandomColor()],
          }));
        }
      } else {
        // If balance is insufficient, display an alert and don't update the balance
        alert("Insufficient Balance");
      }
    }
  }

  const data = {
    labels: databaseField,
    datasets: [databaseData],
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-start">
      balance: {balance}
      <div className="bg-white p-8 rounded-md shadow-md w-96 mt-8">
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
          name="typeNew"
          id="typeNew"
          onChange={handleRecordChange}
        >
          {expenseType.map((content: string, index: number) => (
            <option key={index}>{content}</option>
          ))}
        </select>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
          type="text"
          inputMode="numeric"
          name="amount"
          id="amount"
          placeholder="Amount"
          onChange={handleRecordChange}
        />
        <select
          className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none"
          name="category"
          id="category"
          onChange={handleRecordChange}
        >
          {category.map((category: string, index: number) => (
            <option key={index}>{category}</option>
          ))}
        </select>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          type="submit"
          onClick={handleAddRecord}
        >
          Add Record
        </button>
      </div>
      <div>
        <Pie data={data} />
      </div>
    </div>
  );
};
export default NewRecord;
