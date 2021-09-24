import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, {
  FunctionComponent, useEffect,
  useState
} from "react";
import { Contract } from "web3-eth-contract";
import { TabsComponent } from "./components/Tabs";
import { TOKEN_CONTRACT_ADDRESS } from "./constant";
import { minABI } from "./constant/erc20usdt_abi";
import styles from "./styles/App.module.scss";
import { icons } from "./themes";

interface AppProps {}

const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 97],
});


export const App: FunctionComponent<AppProps> = () => {
  const { account, library , activate } = useWeb3React();
  const [contract, setContract] = useState({} as Contract);

  useEffect(() => {
     activate(injectedConnector);
  }, [activate]);

  useEffect(() => {
    if (!!library) {
      const { eth } = library;
      const { Contract } = eth;
      const existContract: Contract = new Contract(
        minABI,
        TOKEN_CONTRACT_ADDRESS
      );
      setContract(existContract);
    }
  }, [library]);

  console.log("library", library);

  return (
    <div className={styles.App}>
      <header className={styles.App__header}>
        <img
          src={icons.LogoMetaMask}
          className={styles.App__header__logo}
          alt="logo"
        />
        <TabsComponent account={account as string} contract={contract} />
      </header>
    </div>
  );
};

export default App;
