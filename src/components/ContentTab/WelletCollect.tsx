import { QrcodeOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Button, message } from "antd";
import React, { FunctionComponent, useState } from "react";
import styles from "../../styles/DetailAccount.module.scss";

const walletconnect = new WalletConnectConnector({
  qrcode: true,
  rpc: { 97: "https://data-seed-prebsc-1-s1.binance.org:8545/" },
});

interface WelletCollectProps {
  account: string;
}

const isConnectedMetaMask = "MetaMask";

export const WelletCollect: FunctionComponent<WelletCollectProps> = ({
  account,
}) => {
  const { activate, deactivate } = useWeb3React();
  const [nameButton, setNameButton] = useState(() => {
    if (account === isConnectedMetaMask) {
      return "Wallet collect";
    } else {
      return "Wallect collected";
    }
  });
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const connect = async () => {
    try {
      setLoading(true);
      setNameButton("Loading...");
      deactivate();
      await activate(walletconnect);
      setNameButton("Wallect collected");
      setLoading(false);
      setDisable(true);
      message.success("wallet collect success");
    } catch (error) {
      console.log("error", error);
      message.error("wallet collect error");
    }
  };

  return (
    <div className={styles.walletCollect}>
      <Button
        type="primary"
        loading={loading}
        icon={loading ? "" : <QrcodeOutlined />}
        onClick={connect}
        disabled={disable}
      >
        {nameButton}
      </Button>
    </div>
  );
};
