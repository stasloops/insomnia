import { Button } from "antd";
import React from "react";
import Web3 from "web3";

interface Window {
  ethereum: any;
}

const Wallet = () => {
  let selectedAccount;
  const windowA: any = window;
  let provider = windowA.ethereum;

  const connect = async () => {
    if (typeof provider !== "undefined") {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      selectedAccount = accounts[0];
      console.log(selectedAccount);

      provider.on("accountsChanged", function (accounts: any) {
        selectedAccount = accounts[0];
        console.log(`Selected account changed to ${selectedAccount}`);
      });

      const web3 = new Web3(provider);
    }
  };

  return (
    <Button onClick={connect} type="primary">
      Wallet
    </Button>
  );
};

export default Wallet;
