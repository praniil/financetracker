import React, { ReactHTML, ReactHTMLElement, useState } from "react";

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
const currencytype: string[] = ["NPR", "USD", "CAD", "INR"];
interface template {
  templatename: string;
  amount: string;
  category: string;
  currencytype: string;
}
const Template = () => {
  const [userDetails, setUserDetails] = useState<template>({
    templatename: "",
    amount: "",
    category: "Income",
    currencytype: "NPR",
  });
  const [done, setDone] = useState<boolean>(false);
  function handleDone(event: React.FormEvent) {
    event.preventDefault();
    setDone(true);
    console.log("templatename", userDetails.templatename);
    console.log("amount", userDetails.amount);
    console.log("category", userDetails.category);
    console.log("currtype", userDetails.currencytype);
  }
  function handleChange(event: any) {
    const { name, value } = event.target;
    console.log(value);
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
    console.log(userDetails);
  }
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">New Template</h1>
      <form className="space-y-4">
        <div>
          <input
            type="text"
            name="templatename"
            id="templatername"
            placeholder="Template Name"
            className="w-full p-2 border rounded-md"
            value={userDetails.templatename}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="amount"
            placeholder="amount"
            className="w-full p-2 border rounded-md"
            value={userDetails.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <select
            name="category"
            id="category"
            className="w-full p-2 border rounded-md"
            value={userDetails.category}
            onChange={handleChange}
          >
            {category.map((items, index) => (
              <option key={index}>{items}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="currencytype"
            id="currencytype"
            className="w-full p-2 border rounded-md"
            value={userDetails.currencytype}
            onChange={handleChange}
          >
            {currencytype.map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default Template;
