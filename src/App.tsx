import React, {
  useEffect,
  useState,
  FunctionComponent,
  useCallback,
} from "react";
import { useWeb3Context } from "web3-react";
import { Web3Context } from "web3-react/dist/context";
import "./styles/App.scss";
import { icons } from "./themes";
import { Contract } from "web3-eth-contract";
import { TOKEN_CONTRACT_ADDRESS } from "./constant";
import { minABI } from "./constant/erc20usdt_abi";
import {fromWei} from "web3-utils";
import {OtherBalanceOf} from './components/OtherBalanceOf'
import {SendERC20} from './components/SendERC20'

interface AppProps {}

export const App: FunctionComponent<AppProps> = () => {
  const context: Web3Context = useWeb3Context();
  const [contract, setContract] = useState(undefined as any);
  const [balanceOfMyAccount, setBalanceOfMyAccount] = useState('');
  const [balanceOfOther, setBalanceOfOther] = useState('');
  const [isLoading , setIsLoading] = useState(false);

  const getBalanceOf = useCallback(async ( from = context.account , isOther = false) => {
    if (contract) {
      const value = await contract.methods.balanceOf(from).call({ from });
      const amount = fromWei(value , 'ether');
      if(isOther){
        setBalanceOfOther(amount)
      }else {
      setBalanceOfMyAccount(amount);
      }
    }
  }, [contract , context.account]);

  const sendUrc20 = useCallback(
    async () => {
      if(contract){
        const tranfered = await contract.methods
          .transfer(
            "0x9c858484b4d35F0161d55a6D0dcE40204D459ef7",
            `${10 * Math.pow(10, 18)}`
          )
          .send({ from: context.account, value: `${10 * Math.pow(10, 18)}` });
          debugger;
        console.log("tranfered", tranfered);
      }
    },
    [contract, context.account],
  )

  useEffect(() => {
    context.setFirstValidConnector(["MetaMask", "Infura"]);
  }, [context]);

  useEffect(() => {
    const { library } = context;
    if (!!library) {
      const { eth } = library;
      const { Contract } = eth;
      const existContract: Contract = new Contract(
        minABI,
        TOKEN_CONTRACT_ADDRESS
      );
      setContract(existContract);
    }
  }, [context]);

  useEffect(() => {
    getBalanceOf();
  }, [getBalanceOf]);

    useEffect(() => {
      sendUrc20();
    }, [sendUrc20]);

  return (
    <div className="App">
      <header className="App--header">
        <img src={icons.LogoMetaMask} className="App--logo" alt="logo" />
        <p>Account connected : {context?.account}</p>
        <span>My balance of : {balanceOfMyAccount}</span>
        <OtherBalanceOf
          getBalanceOf={getBalanceOf}
          balanceOfOther={balanceOfOther}
        />
        <SendERC20 sendUrc20={sendUrc20} success={isLoading} />
      </header>
    </div>
  );
};

export default App;
