import React, { useState } from "react";
import axios from "axios";

const AccBalance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [isAdjustingBalance, setIsAdjustingBalance] = useState<boolean>(false);
  const [newBalance, setNewBalance] = useState<number | null>(null);
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
  return (
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
          <button onClick={handleSaveBalance} className="bg-blue-500 text-white rounded-sm p-1 m-1"> Done </button>
        </div>
      ) : (
        <button onClick={handleBalance} className="bg-blue-500 text-white rounded-sm p-1 m-1"> Adjust Balance </button>
      )}
    </div>
  );
};

export default AccBalance;
