import { Form, Input } from "antd";
import React, { FunctionComponent, useState } from "react";
import { Contract } from "web3-eth-contract";
import { Web3Context } from "web3-react/dist/context";
import { fromWei } from "web3-utils";
import styles from "../../styles/DetailAccount.module.scss";

interface OrtherBalanceOfProps {
  context: Web3Context;
  contract: Contract;
}

const { Search } = Input;

export const OrtherBalanceOf: FunctionComponent<OrtherBalanceOfProps> = ({
  context,
  contract,
}) => {
  const [balanceOf, setBalanceOf] = useState("");
  const [errAccountId, setErrAccountId] = useState("");

  const onSearch = async (value: string) => {
    try {
      contract.methods
        .balanceOf(value)
        .call({ from: context.account })
        .then((result: string) => {
          const amount = fromWei(result, "ether");
          setBalanceOf(amount);
          setErrAccountId("");
        });
    } catch (error) {
      setErrAccountId("Invalid acountId");
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.otherBalanceOf}>
      <div className={styles.otherBalanceOf__wapperInput}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="AccountId"
            name="AccountId"
            rules={[
              {
                validator: (rule, value, callback) => {
                  // rule -> object chứa thông tin context của input gồm value - err
                  // value -> giá trị khi user nhập
                  // callBack (err) gọi lại err của input
                  console.log("rule", rule);
                  if (errAccountId) {
                    callback(errAccountId);
                  } else {
                    callback(undefined);
                  }
                },
              },
            ]}
          >
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </Form.Item>
          <Form.Item label="BalanceOf" name="BalanceOf">
            <span style={{ color: "white", fontSize: 16 }}> {balanceOf} </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
