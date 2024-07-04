import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balanceBN = await atm.getBalance();
      const balance = ethers.utils.formatEther(balanceBN); // Convert from wei to ether
      setBalance(balance);
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(ethers.utils.parseEther(amount.toString()));
      await tx.wait();
      getBalance();
      addTransaction(account[0], contractAddress);
      setErrorMessage("");
    }
  };

  const withdraw = async () => {
    if (atm) {
      const balanceBN = ethers.utils.parseEther(balance); // Convert from ether to wei
      const withdrawAmountBN = ethers.utils.parseEther(amount.toString());

      if (withdrawAmountBN.gt(balanceBN)) {
        setErrorMessage("Insufficient balance for this withdrawal");
        return;
      }

      let tx = await atm.withdraw(withdrawAmountBN);
      await tx.wait();
      getBalance();
      addTransaction(contractAddress, account[0]);
      setErrorMessage("");
    }
  };

  const addTransaction = (from, to) => {
    setTransactions([...transactions, { from, to, amount }]);
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const copyAccountToClipboard = () => {
    if (account) {
      navigator.clipboard.writeText(account[0]);
      alert("Account address copied to clipboard!");
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <div className="connect-container">
          <br></br>
          <button onClick={connectAccount} style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold', padding: '15px 30px', fontSize: '18px' }}>Please connect your Metamask wallet</button>
        </div>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div style={{ marginTop: '10px' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Your Account: {account}</p>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Your Balance: {balance} ETH</p>
        <div style={{ marginBottom: '20px' }}></div>
        <input
          type="number"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginBottom: '20px', width: '100%', padding: '15px', fontSize: '18px' }}
        />
        <div>
          <button onClick={deposit} style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold', marginRight: '10px', padding: '15px 30px', fontSize: '18px' }}>Deposit ETH</button>
          <button onClick={withdraw} style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', padding: '15px 30px', fontSize: '18px' }}>Withdraw ETH</button>
        </div>
       
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <br></br>
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((tx, index) => (
            <li key={index} style={{ fontSize: '18px' }}>
              From: {tx.from}, To: {tx.to}, Amount: {tx.amount} ETH
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <main className="container">
      <header>
        <h1>Binged NFT:ETH Online Banking</h1>
      </header>
      {initUser()}
      <div className="controls">
        <button onClick={clearTransactions} style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold', padding: '10px 20px', fontSize: '16px', margin: '10px' }}>Clear Transactions</button>
        <button onClick={copyAccountToClipboard} style={{ backgroundColor: 'purple', color: 'white', fontWeight: 'bold', padding: '10px 20px', fontSize: '16px', margin: '10px' }}>Copy Account Address</button>
      </div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Verdana, sans-serif;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background-color: black;
          color: white;
          padding: 20px;
          min-height: 100vh;
          flex-direction: column;
        }
        .connect-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        input {
          font-family: Verdana, sans-serif;
        }
        .controls {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .controls button {
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
      `}</style>
    </main>
  );
}
