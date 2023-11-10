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
  const [balance, setBalance] = useState<number>(0);
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<AccBalance passBalance = {{balance, setBalance}}/>} />
          <Route path="/addAccount" element={<AddAccount  />} />
          <Route path="/template" element={<Template />} />
          <Route path="/newRecord" element={<NewRecord passBalance = {{balance, setBalance}}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
