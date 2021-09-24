import {
  ApiOutlined,
  InfoCircleOutlined,
  NumberOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import _ from "lodash";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Contract } from "web3-eth-contract";
import { fromWei } from "web3-utils";
import { SendERC20 } from "../components/ContentTab/SendERC20";
import styles from "../styles/Tabs.module.scss";
import { DetailAccount } from "./ContentTab/DetailAccount";
import { OrtherBalanceOf } from "./ContentTab/OrtherBalanceOf";
import { WelletCollect } from "./ContentTab/WelletCollect";

const { TabPane } = Tabs;

interface TabsComponentProps {
  account: string;
  contract: Contract;
}

export const TabsComponent: FunctionComponent<TabsComponentProps> = ({
  account,
  contract,
}) => {
  const [balanceOfMyAccount, setBalanceOfMyAccount] = useState("");

  const getBalanceOf = useCallback(async () => {
    if (!_.isEmpty(contract)) {
      try {
        const value = await contract.methods
          .balanceOf(account)
          .call({ from: account });
        const amount = fromWei(value, "ether");
        setBalanceOfMyAccount(amount);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [contract, account]);

  useEffect(() => {
    getBalanceOf();
  }, [getBalanceOf]);

  const callback = (activeKey: string) => {
    console.log(activeKey);
  };

  return (
    <div className={styles.tabs}>
      <Tabs defaultActiveKey="1" onChange={callback} tabPosition={"top"}>
        <TabPane
          tab={
            <span>
              <InfoCircleOutlined />
              Detail account
            </span>
          }
          key="1"
        >
          <DetailAccount accountId={account} balanceOf={balanceOfMyAccount} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <NumberOutlined />
              Other balanceOf
            </span>
          }
          key="2"
        >
          <OrtherBalanceOf account={account} contract={contract} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <SendOutlined />
              Send ERC-20 Tokens
            </span>
          }
          key="3"
        >
          <SendERC20 account={account} contract={contract} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ApiOutlined />
              Wallet connect
            </span>
          }
          key="4"
        >
          <WelletCollect account={account} />
        </TabPane>
      </Tabs>
    </div>
  );
};
