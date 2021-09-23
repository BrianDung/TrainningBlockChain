import React, { FunctionComponent, useState } from "react";

interface SendERC20Props {
  sendUrc20: Function;
  success: boolean;
}

export const SendERC20: FunctionComponent<SendERC20Props> = ({
  sendUrc20,
  success,
}) => {
  const [addressOther, setAddessOther] = useState(
    "0x9c858484b4d35F0161d55a6D0dcE40204D459ef7"
  );
  const handleChange = (e: any) => {
    const value = e.target.value;
    setAddessOther(value);
  };
  const sendUrc20To = () => {
    sendUrc20(addressOther, true);
  };
  return (
    <div>
      Send ERC-20: <input onChange={handleChange} />
      <button type="button" onClick={sendUrc20To} style={{ marginLeft: 10 }}>
        Send
      </button>
      {success ? <div>Sucess</div> : <div>Loading .....</div>}
    </div>
  );
};
