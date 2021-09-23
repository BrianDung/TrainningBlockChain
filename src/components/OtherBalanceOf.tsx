import React, { FunctionComponent, useState } from "react";

interface OtherBalanceOfProps {
  getBalanceOf: Function;
  balanceOfOther: string;
}

export const OtherBalanceOf: FunctionComponent<OtherBalanceOfProps> = ({
  getBalanceOf,
  balanceOfOther,
}) => {
  const [addressOther, setAddessOther] = useState(
    "0x9c858484b4d35F0161d55a6D0dcE40204D459ef7"
  );
  const handleChange = (e: any) => {
    const value = e.target.value;
    setAddessOther(value);
  };
  const smartTransaction = () => {
    getBalanceOf(addressOther, true);
  };
  return (
    <div>
      The destination address: <input onChange={handleChange} />
      <button
        type="button"
        onClick={smartTransaction}
        style={{ marginLeft: 10 }}
      >
        Get Balance
      </button>
      <div>Balance of : {balanceOfOther}</div>
    </div>
  );
};
