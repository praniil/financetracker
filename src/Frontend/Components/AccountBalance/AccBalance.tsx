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
      try {
        const response = await axios.post("http://localhost:8080/api/update-balance", {
          balance: newBalance,
        });
        if (response.status === 200) {
          setBalance(newBalance);
          setIsAdjustingBalance(false);
        } else {
          console.error("failed to update balance");
        }
      } catch (error) {
        console.error("An error occured while updating balance: ", error);
      }
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
