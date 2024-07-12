# WaveSpot Subscription

WaveSpot Subscription is a decentralized application (DApp) built on Ethereum for managing product subscriptions using smart contracts. Users can subscribe to different levels of service by interacting with the Ethereum blockchain through MetaMask or a compatible Ethereum wallet.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your local machine.
- MetaMask extension installed in your web browser.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd wavespot-subscription
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Project

3. Open two additional terminals in your VS Code.

4. **Terminal 2:** Start the Hardhat local node:
   ```
   npx hardhat node
   ```

5. **Terminal 3:** Deploy the smart contract to the local network:
   ```
   npx hardhat run --network localhost scripts/deploy.js
   ```

6. **Terminal 1:** Start the Next.js development server for the front-end:
   ```
   npm run dev
   ```

7. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Smart Contract

The smart contract `WaveSpotSubscription.sol` manages subscription logic and storage of subscriber data. It includes:

- `subscribe(string memory _name, SubscriptionType _subscriptionType)`: Allows users to subscribe by providing their name and selecting a subscription type.
- `getSubscription(address _subscriber)`: Retrieves subscription details for a given subscriber address.

## Front End

The front-end application is built using Next.js and ethers.js for Ethereum interaction. Key features include:

- MetaMask integration for wallet connectivity and transaction signing.
- User-friendly interface for subscription management.
- Dynamic updates based on user actions (subscription type selection, name input).

## Deployment

Deploy the smart contract `WaveSpotSubscription.sol` to an Ethereum network using Remix IDE, Hardhat, or similar tools. Update the contract address in the front-end code (`HomePage.js`) to reflect the deployed contract address.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements, bug fixes, or new features.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Ethereum and MetaMask for providing tools and infrastructure for decentralized applications.
- OpenZeppelin for smart contract libraries and security best practices.
