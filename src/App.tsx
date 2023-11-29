import React, { useEffect } from "react";
import logo from "./logo.svg";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AccBalance from "./Frontend/Components/AccountBalance/AccBalance";
import AddAccount from "./Frontend/Components/AccountBalance/AddAccount";
import Navbar from "./Frontend/Navbar/Navbar";
import Template from "./Frontend/Components/AccountBalance/Template";
import NewRecord from "./Frontend/Components/AccountBalance/NewRecord";
import PieData from "./Frontend/Components/AccountBalance/PieData";
import axios from "axios";

function App() {
  interface newRecord {
    typeNew: string;
    amount: number;
    category: string;
  }
  interface pieData {
    data: number[];
    backgroundColor: string[];
  }
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const [balance, setBalance] = useState<number>(0);
  const [newRecord, setNewRecord] = useState<newRecord>({
    typeNew: "INCOME",
    amount: 0,
    category: "Income",
  });
  const [databaseField, setDatabaseField] = useState<string[]>([]);
  const [databaseData, setDatabaseData] = useState<pieData>({
    data: [],
    backgroundColor: [getRandomColor()],
  });
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch databaseField and databaseData from the API
      const response = await axios.get("http://localhost:8080/api/get-field");
      const updateFieldData: pieData = response.data.data;

      const keys = Object.keys(updateFieldData) as string[];
      const values = Object.values(updateFieldData).flat() as string[];
      setDatabaseField(keys);
      setDatabaseData((prevData) => ({
        ...prevData,
        data: values.map((val) => parseInt(val, 10)), // Convert strings to numbers
        backgroundColor: [...prevData.backgroundColor, getRandomColor()],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AccBalance passBalance={{ balance, setBalance }} />
                <PieData
                  passPieField={{ databaseField, setDatabaseField }}
                  passPieData={{ databaseData, setDatabaseData }}
                />
              </>
            }
          />
          <Route path="/addAccount" element={<AddAccount />} />
          <Route path="/template" element={<Template />} />
          <Route
            path="/newRecord"
            element={
              <NewRecord
                passBalance={{ balance, setBalance }}
                passRecord={{ newRecord, setNewRecord }}
                passPieField={{ databaseField, setDatabaseField }}
                passPieData={{ databaseData, setDatabaseData }}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
