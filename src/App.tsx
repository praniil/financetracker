import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AccBalance from './Frontend/Components/AccountBalance/AccBalance';
import Stats from './Frontend/Components/ExpenseStructure/Stats';

function App() {
  return (
    <div className="App">
      <AccBalance/>
      <Stats/>
    </div>
  );
}

export default App;
