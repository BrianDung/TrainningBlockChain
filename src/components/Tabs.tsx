import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Tabs } from "antd";
import styles from "../styles/Tabs.module.scss";
import "antd/dist/antd.css";
import { InfoCircleOutlined , NumberOutlined , SendOutlined} from "@ant-design/icons";
import { Web3Context } from "web3-react/dist/context";
import { DetailAccount } from "./ContentTab/DetailAccount";
import { Contract } from "web3-eth-contract";
import _ from 'lodash'
import { fromWei } from "web3-utils";
import { OrtherBalanceOf } from "./ContentTab/OrtherBalanceOf";
import { SendERC20 } from "../components/ContentTab/SendERC20";

const { TabPane } = Tabs;

interface TabsComponentProps {
  context: Web3Context;
  contract: Contract;
}

export const TabsComponent: FunctionComponent<TabsComponentProps> = ({
  context, contract
}) => {
  const [balanceOfMyAccount, setBalanceOfMyAccount] = useState("");

  const getBalanceOf = useCallback(
    async (from = context.account) => {
      if (!_.isEmpty(contract)) {
        const value = await contract.methods.balanceOf(from).call({ from });
        const amount = fromWei(value, "ether");
          setBalanceOfMyAccount(amount);
        }
      },
    [contract, context.account]
  );

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
          <DetailAccount
            accountId={context.account as string}
            balanceOf={balanceOfMyAccount}
          />
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
          <OrtherBalanceOf context={context} contract={contract} />
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
          <SendERC20 context={context} contract={contract} />
        </TabPane>
      </Tabs>
    </div>
  );
};
