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
        if (response.status === 201) {
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
    <div>
      <div>Cash: {balance}</div>

      {isAdjustingBalance ? (
        <div>
          <input
            type="number"
            value={newBalance || ""}
            onChange={(event) =>
              handleBalanceChange(Number(event.target.value))
            }
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSaveBalance}> Done </button>
        </div>
      ) : (
        <button onClick={handleBalance}> Adjust Balance </button>
      )}
    </div>
  );
};

export default AccBalance;
