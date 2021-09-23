import React, { FunctionComponent, useState } from "react";

interface OtherBalanceOfProps {
  getBalanceOf: Function;
  balanceOfOther: string;
}

export const OtherBalanceOf: FunctionComponent<OtherBalanceOfProps> = ({
  getBalanceOf,
  balanceOfOther,
}) => {
  const [addressOther, setAddessOther] = useState("");
  const handleChange = (e: any) => {
    const value = e.target.value;
    setAddessOther(value);
  };
  const smartTransaction = () => {
    getBalanceOf(addressOther , true);
  };
  return (
    <div>
      The destination address: <input onChange={handleChange} />
      <button
        type="button"
        onClick={smartTransaction}
        style={{ marginLeft: 10 }}
      >
        Send
      </button>
      <div>Balance of : {balanceOfOther}</div>
    </div>
  );
};
