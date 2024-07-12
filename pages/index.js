import {useState, useEffect} from "react";
import {ethers} from "ethers";
import subscription_abi from "../artifacts/contracts/Assessment.sol/WaveSpotSubscription.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [subscriptionService, setSubscriptionService] = useState(undefined);
  const [name, setName] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("Basic");
  const [subscriptionCost, setSubscriptionCost] = useState(0.01);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const subscriptionABI = subscription_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
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

    getSubscriptionServiceContract();
  };

  const getSubscriptionServiceContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const subscriptionContract = new ethers.Contract(contractAddress, subscriptionABI, signer);

    setSubscriptionService(subscriptionContract);
  };

  const subscribe = async () => {
    if (subscriptionService && name) {
      const subscriptionTypeIndex = subscriptionType === "Basic" ? 0 : subscriptionType === "Standard" ? 1 : 2;
      const subscriptionValue = ethers.utils.parseEther(subscriptionCost.toString());
  
      try {
        let overrides = {
          value: subscriptionValue,
          gasLimit: ethers.BigNumber.from("3000000")  // Adjust the gas limit as needed
        };
  
        let tx = await subscriptionService.subscribe(name, subscriptionTypeIndex, overrides);
        await tx.wait();
  
        alert(`Subscribed to ${subscriptionType} plan successfully!`);
      } catch (error) {
        console.error("Subscription error:", error);
        alert("Error subscribing. Please check the console for details.");
      }
    } else {
      alert("Please fill in your name and connect your wallet.");
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask to use this service.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="Basic" checked={subscriptionType === "Basic"} onChange={() => { setSubscriptionType("Basic"); setSubscriptionCost(0.01); }} />
            Basic (0.01 ETH)
          </label>
          <label>
            <input type="radio" value="Standard" checked={subscriptionType === "Standard"} onChange={() => { setSubscriptionType("Standard"); setSubscriptionCost(0.05); }} />
            Standard (0.05 ETH)
          </label>
          <label>
            <input type="radio" value="Premium" checked={subscriptionType === "Premium"} onChange={() => { setSubscriptionType("Premium"); setSubscriptionCost(0.1); }} />
            Premium (0.1 ETH)
          </label>
        </div>
        <button onClick={subscribe}>Subscribe</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to WaveSpot Subscription!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
