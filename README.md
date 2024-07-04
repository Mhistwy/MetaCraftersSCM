# Binged NFT:ETH Online Banking

## Overview
Binged NFT:ETH Online Banking is a decentralized application (dApp) built on Ethereum blockchain, providing users with basic banking functionalities like depositing and withdrawing ETH. It features a smart contract backend and a React front-end for interacting with the blockchain.

## Features
- **Deposit ETH**: Users can deposit ETH into their account.
- **Withdraw ETH**: Users can withdraw ETH from their account.
- **Transaction History**: Displays transaction history showing deposits and withdrawals.
- **Real-time ETH Balance**: Updates and displays user's ETH balance in real-time.
- **MetaMask Integration**: Requires MetaMask for wallet interaction.

## Technologies Used
- **Solidity**: Smart contract development for Ethereum blockchain.
- **React**: Front-end development for user interface.
- **Web3.js / ethers.js**: Libraries for interacting with Ethereum blockchain.
- **Remix IDE**: Development and testing environment for smart contracts.

## Installation
1. Clone the repository:
   ```
   git clone <repository_url>
   cd binged-nft-eth-online-banking
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Open two additional terminals in your VS Code.

4. In the second terminal, start a local Ethereum node:
   ```
   npx hardhat node
   ```

5. In the third terminal, deploy the smart contract to the local network:
   ```
   npx hardhat run --network localhost scripts/deploy.js
   ```

6. Back in the first terminal, start the React app:
   ```
   npm run dev
   ```

7. After this, the project will be running on your localhost, typically at [http://localhost:3000/](http://localhost:3000/).

## Usage
1. Connect MetaMask to the Ethereum Rinkeby network.
2. Navigate to the deployed dApp URL.
3. Connect your MetaMask wallet to start using the online banking functionalities.
4. Deposit and withdraw ETH as needed.

## Smart Contract Details
- **Contract Address**: `<0x5FbDB2315678afecb367f032d93F642f64180aa3>`
- **ABI**: The ABI file is located in the `artifacts/contracts/Assessment.sol/Assessment.json`.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
