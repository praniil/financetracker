import React, { useContext, useEffect } from "react";
import { useState } from "react";

const NewRecord: React.FC = () => {
  interface newRecord {
    typeNew: string;
    amount: number;
    category: string;
  }

  const [newRecord, setNewRecord] = useState<newRecord>({
    typeNew: "Income",
    amount: 0,
    category: "Income",
  });

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
    setNewRecord({
      ...newRecord,
      [name]: value,
    });
    console.log(newRecord);
  }

  function handleAddRecord(event: React.FormEvent) {
    event.preventDefault();
    console.log("Type: ", newRecord.typeNew);
    console.log("Amount: ", newRecord.amount);
    console.log("Category: ", newRecord.category);
    
  }

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-start">
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
    </div>
  );
};

export default NewRecord;
