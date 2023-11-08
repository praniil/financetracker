import React from "react";

const optionArray: string[] = [
  "General",
  "Cash",
  "Current account",
  "Saving account",
  "Loan",
];
const currencytype : string[] = [
    "NPR",
    "USD",
    "CAD",
    "INR"
]
const AddAccount = () => {
  return (
    <div>
      <input
        type="text"
        name="accname"
        id="accname"
        placeholder="Account Name"
      />
      <input type="text" name="initialbalance" placeholder="Initial Balance" />
      <select name="accounttype" id="accounttype">
        {optionArray.map((items, index) => (
          <option key={index}>{items}</option>
        ))}
      </select>
      <select name="currencytype" id="currencytype">
            {currencytype.map((currency, index) => (
                <option key={index}>{currency}</option>
            ))}
      </select>
      
    </div>
  );
};

export default AddAccount;
