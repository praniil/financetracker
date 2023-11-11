import React from "react";
import logo from "./logo.svg";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AccBalance from "./Frontend/Components/AccountBalance/AccBalance";
import Stats from "./Frontend/Components/ExpenseStructure/Stats";
import AddAccount from "./Frontend/Components/AccountBalance/AddAccount";
import Navbar from "./Frontend/Navbar/Navbar";
import Template from "./Frontend/Components/AccountBalance/Template";
import NewRecord from "./Frontend/Components/AccountBalance/NewRecord";

function App() {
  interface newRecord {
    typeNew: string;
    amount: number;
    category: string;
  }
  const [balance, setBalance] = useState<number>(0);
  const [newRecord, setNewRecord] = useState<newRecord>({
    typeNew: "INCOME",
    amount: 0,
    category: "Income",
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
                <Stats passRecord={{ newRecord, setNewRecord}} />{" "}
              </>
            }
          />
          <Route path="/addAccount" element={<AddAccount />} />
          <Route path="/template" element={<Template />} />
          <Route
            path="/newRecord"
            element={<NewRecord passBalance={{ balance, setBalance }} passRecord={{ newRecord, setNewRecord}} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
