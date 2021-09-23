import React, {
  FunctionComponent, useEffect,
  useState
} from "react";
import { Contract } from "web3-eth-contract";
import { useWeb3Context } from "web3-react";
import { Web3Context } from "web3-react/dist/context";
import { TabsComponent } from "./components/Tabs";
import { TOKEN_CONTRACT_ADDRESS } from "./constant";
import { minABI } from "./constant/erc20usdt_abi";
import styles from "./styles/App.module.scss";
import { icons } from "./themes";

interface AppProps {}

export const App: FunctionComponent<AppProps> = () => {
  const context: Web3Context = useWeb3Context();
  const [contract, setContract] = useState({} as Contract);


  // const sendUrc20 = useCallback(
  //   async () => {
  //     if(contract){
  //       const tranfered = await contract.methods
  //         .transfer(
  //           "0x9c858484b4d35F0161d55a6D0dcE40204D459ef7",
  //           `${10 * Math.pow(10, 18)}`
  //         )
  //         .send({ from: context.account, value: `${10 * Math.pow(10, 18)}` });
  //         debugger;
  //       console.log("tranfered", tranfered);
  //     }
  //   },
  //   [contract, context.account],
  // )

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


  // useEffect(() => {
  //   sendUrc20();
  // }, [sendUrc20]);

  return (
    <div className={styles.App}>
      <header className={styles.App__header}>
        <img
          src={icons.LogoMetaMask}
          className={styles.App__header__logo}
          alt="logo"
        />
        <TabsComponent context={context} contract={contract}/>

        {/* <p>Account connected : {context?.account}</p>
        <span>My balance of : {balanceOfMyAccount}</span>
        <OtherBalanceOf
          getBalanceOf={getBalanceOf}
          balanceOfOther={balanceOfOther}
        />
        <SendERC20 sendUrc20={sendUrc20} success={isLoading} /> */}
      </header>
    </div>
  );
};

export default App;
