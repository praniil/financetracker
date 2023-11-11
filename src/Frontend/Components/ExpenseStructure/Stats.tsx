import React from "react";
interface record {
  passRecord: {
    newRecord: {
      typeNew: string;
      amount: number;
      category: string;
    };
    setNewRecord: React.Dispatch<
      React.SetStateAction<{
        typeNew: string;
        amount: number;
        category: string;
      }>
    >;
  };
}

type props = record;

const Stats: React.FC<props> = ({ passRecord }) => {
  const {newRecord, setNewRecord} = passRecord;
  return <div>
    
  </div>;
};

export default Stats;
