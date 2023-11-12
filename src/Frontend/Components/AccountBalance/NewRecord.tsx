import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

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
type props = balanceInterface & recordInterface;

const NewRecord: React.FC<props> = ({ passBalance, passRecord }) => {
  // interface newRecord {
  //   typeNew: string;
  //   amount: number;
  //   category: string;
  // }
  const { balance, setBalance } = passBalance;
  const { newRecord, setNewRecord } = passRecord;
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

  const [fields, setFields] = useState<string[]>([newRecord.category]);
  interface pieData {
    data: number[];
    backgroundColor: string[];
  }
  const [dataset, setDataset] = useState<pieData>({
    data: [newRecord.amount],
    backgroundColor: [getRandomColor()],
  });

  function handleAddRecord(event: React.FormEvent) {
    event.preventDefault();
    if (newRecord.typeNew === expenseType[0]) {
      setBalance(
        (prevBalance) => Number(prevBalance) + Number(newRecord.amount)
      );
      setFields((prevFields) => [...prevFields, newRecord.category]);
      setDataset((prevDataset) => ({
        data: [...prevDataset.data, newRecord.amount],
        backgroundColor: [...prevDataset.backgroundColor, getRandomColor()],
      }));
    } else {
      if (balance >= newRecord.amount) {
        setBalance(
          (prevBalance) => Number(prevBalance) - Number(newRecord.amount)
        );
        setFields((prevFields) => [...prevFields, newRecord.category]);
        setDataset((prevDataset) => ({
          data: [...prevDataset.data, newRecord.amount],
          backgroundColor: [...prevDataset.backgroundColor, getRandomColor()],
        }));
      }
    }
  }

  const data = {
    labels: fields,
    datasets: [dataset],
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
