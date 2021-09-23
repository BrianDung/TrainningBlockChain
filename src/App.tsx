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

  return (
    <div className={styles.App}>
      <header className={styles.App__header}>
        <img
          src={icons.LogoMetaMask}
          className={styles.App__header__logo}
          alt="logo"
        />
        <TabsComponent context={context} contract={contract}/>
      </header>
    </div>
  );
};

export default App;
