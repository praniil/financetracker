import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AccBalance = () => {
  //useStates
  const [balance, setBalance] = useState<number>(0);
  const [isAdjustingBalance, setIsAdjustingBalance] = useState<boolean>(false);
  const [newBalance, setNewBalance] = useState<number | null>(null);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isNewRecordDown, setIsNewRecordDown] = useState<boolean>(false);

  //dropdown
  function toggleDropdown() {
    setIsDropdown(!isDropdown);
  }
  function toggleRecordDropdown() {
    setIsNewRecordDown(!isNewRecordDown);
  }
  function handleBalance() {
    setIsAdjustingBalance(!isAdjustingBalance);
  }
  function handleBalanceChange(newValue: number) {
    setNewBalance(newValue);
  }
  const handleSaveBalance = async () => {
    if (newBalance !== null) {
      // setBalance(newBalance)
      try {
        const response = await axios.post(
          "http://localhost:8080/api/update-balance",
          {
            userBalance: newBalance, // Send newBalance as an object property
          }
        );
        console.log("response", response);
        if (response.status === 200) {
          setBalance(newBalance);
        } else {
          console.error("Failed to update balance");
        }
      } catch (error) {
        console.error("An error occurred while updating balance: ", error);
      }
      setIsAdjustingBalance(false);
    }
  };

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSaveBalance();
    }
  }
  function handleAddacc() {}
  return (
    <div>
      <div className="flex justify-center space-x-4">
        <div className="m-1 p-1">Cash: {balance}</div>

        {isAdjustingBalance ? (
          <div>
            <input
              type="text"
              className="border-blue-300"
              value={newBalance || ""}
              onChange={(event) =>
                handleBalanceChange(Number(event.target.value))
              }
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSaveBalance}
              className="bg-blue-500 text-white rounded-sm p-1 m-1"
            >
              {" "}
              Done{" "}
            </button>
          </div>
        ) : ( 
          <button
            onClick={handleBalance}
            className="bg-slate-500 text-white rounded-md p-1 m-1"
          >
            {" "}
            Adjust Balance{" "}
          </button>
        )}
      </div>
      {/* {
        isDropdown? ()
      <button className="bg-blue-500 text-white rounded-sm p-1 m-1" onClick={toggleDropdown}>Add Account</button>} */}
      <div className="flex flex-col">
        <button
          className="bg-slate-500 text-white rounded-md p-1 m-auto w-32"
          onClick={toggleDropdown}
        >
          Add Account
        </button>
        {isDropdown && (
          <div>
            <div className="bg-white-500 text-black rounded-sm p-1 m-auto border-2 border-red-300 w-96">
              {" "}
              <ul>
                <li>
                  <Link to="/addaccount">Manual Input </Link>
                  <p className="font-serif text-sm text-slate-500">
                    Update your account manually. You can import your
                    transaction or connect the account to your bank later, if
                    you wish.
                  </p>
                </li>
                <li>
                  <Link to="#">Bank Sync</Link>
                  <p className="font-serif text-sm text-slate-500">
                    Connect to your bank account. Synchronise your transactions
                    to Wallet automatically.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full absolute bottom-0 right-0 m-10"
          onClick={toggleRecordDropdown}
        >
          +
        </button>

        {isNewRecordDown && (
          <div>
            <ul className="absolute bottom-20 right-24">
              <Link to="/template">
                <li>Template</li>
              </Link>
              <Link to="/newRecord">
                <li>New Record</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccBalance;
