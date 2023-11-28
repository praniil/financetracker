import React from "react";
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
