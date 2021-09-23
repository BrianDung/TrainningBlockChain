import React from "react";
import ReactDOM from "react-dom";
import Web3Provider, { Connectors } from "web3-react";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Web3 from "web3";
const { InjectedConnector, NetworkOnlyConnector } = Connectors;
const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4 , 97] });
const Infura = new NetworkOnlyConnector({
  providerURL: "https://mainnet.infura.io/v3/...",
});

const connectors = { MetaMask, Infura };

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider
      connectors={connectors}
      libraryName={"web3.js"}
      web3Api={Web3}
    >
      <App />
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
