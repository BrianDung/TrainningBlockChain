import React, { FunctionComponent, useState } from "react";
import { Tabs } from "antd";
import styles from "../styles/Tabs.module.scss";
import "antd/dist/antd.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Web3Context } from "web3-react/dist/context";
import { DetailAccount } from "./ContentTab/DetailAccount";
const { TabPane } = Tabs;

interface TabsComponentProps {
  context: Web3Context;
}

export const TabsComponent: FunctionComponent<TabsComponentProps> = ({
  context,
}) => {
  console.log("context", context);

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
          <DetailAccount accountId={context.account as string} balanceOf={"1"} />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};
