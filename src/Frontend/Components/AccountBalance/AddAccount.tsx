import React, { ReactHTML, ReactHTMLElement, useState } from "react";

const optionArray: string[] = [
  "General",
  "Cash",
  "Current account",
  "Saving account",
  "Loan",
];
const currencytype: string[] = ["NPR", "USD", "CAD", "INR"];
interface iAddAccout {
  accname: string;
  initialbalance: string;
  accounttype: string;
  currencytype: string;
}
const AddAccount = () => {
  const [userDetails, setUserDetails] = useState<iAddAccout>({
    accname: "",
    initialbalance: "",
    accounttype: "General",
    currencytype: "NPR",
  });
  const [done, setDone] = useState<boolean>(false);
  function handleDone(event: React.FormEvent) {
    event.preventDefault();
    setDone(true);
    console.log("accname", userDetails.accname);
    console.log("initialbalance", userDetails.initialbalance);
    console.log("acctype", userDetails.accounttype);
    console.log("currtype", userDetails.currencytype);
  }
  function handleChange(event: any) {
    const { name, value } = event.target;
    console.log(value);
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
    console.log(userDetails);
  }
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add Account</h1>
      <form className="space-y-4">
        <div>
          <input
            type="text"
            name="accname"
            id="accname"
            placeholder="Account Name"
            className="w-full p-2 border rounded-md"
            value={userDetails.accname}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="initialbalance"
            placeholder="Initial Balance"
            className="w-full p-2 border rounded-md"
            value={userDetails.initialbalance}
            onChange={handleChange}
          />
        </div>
        <div>
          <select
            name="accounttype"
            id="accounttype"
            className="w-full p-2 border rounded-md"
            value={userDetails.accname}
            onChange={handleChange}
          >
            {optionArray.map((items, index) => (
              <option key={index}>{items}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="currencytype"
            id="currencytype"
            className="w-full p-2 border rounded-md"
            value={userDetails.currencytype}
            onChange={handleChange}
          >
            {currencytype.map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAccount;
