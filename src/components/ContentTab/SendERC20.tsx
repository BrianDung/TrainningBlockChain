import { RightOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message } from "antd";
import React, { FunctionComponent, useState } from "react";
import { Contract } from "web3-eth-contract";
import styles from "../../styles/DetailAccount.module.scss";

interface SendERC20Props {
  account: string;
  contract: Contract;
}

export const SendERC20: FunctionComponent<SendERC20Props> = ({
  account,
  contract,
}) => {
  const [nameButton, setNameButton] = useState("Send");
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(1);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeNumber = (value: number) => {
    setAmount(value);
  };

  const onChangeInput = (event: any) => {
    const value = event.target.value;
    setTo(value);
  };

  const sendToken = async () => {
    try {
      setNameButton("Loading");
      setLoading(true);
      await contract.methods
        .transfer(to, `${amount * Math.pow(10, 18)}`)
        .send({
          from: account,
        })
        .then((receipt: any) => {
          console.log("send success and data receipt", receipt);
          setNameButton("Send");
          setLoading(false);
          message.success("This is a success send ERC-20 token");
        });
    } catch (error: any) {
      console.log("error send", error);
      setNameButton("Send");
      setLoading(false);
      message.error("Account id invalid");
    }
  };

  return (
    <div className={styles.sendErcTokens}>
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
                required: true,
                message: "require input",
              },
            ]}
          >
            <Input placeholder="input account id" onChange={onChangeInput} />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="Amount"
            rules={[
              {
                required: true,
                message: "require amount should send and unsign int",
              },
            ]}
          >
            <InputNumber
              placeholder="Amount"
              min={1}
              onChange={onChangeNumber}
              defaultValue={1}
            />
          </Form.Item>
          <Form.Item label="Send" name="Send">
            <Button
              type="primary"
              loading={loading}
              icon={loading ? "" : <RightOutlined />}
              onClick={sendToken}
            >
              {nameButton}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
