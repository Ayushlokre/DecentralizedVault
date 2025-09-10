---

# Decentralized Data Vault

## Overview

The **Decentralized Data Vault** is a blockchain-powered application designed to provide secure, transparent, and user-controlled data storage. Unlike traditional cloud storage platforms that rely on centralized servers, this system uses **IPFS (InterPlanetary File System)** for distributed file storage and **Ethereum smart contracts** for access control and verification.

Users can upload, store, and share files while maintaining complete ownership and control over their data. Access permissions are enforced through blockchain transactions, ensuring immutability, privacy, and resistance to unauthorized access or tampering.

This project demonstrates how **Web3 technologies** can be combined to create a decentralized alternative to centralized cloud storage solutions.

---

## Features

* **Blockchain-Backed Security**: Ethereum smart contracts handle file ownership, access permissions, and transaction logs.
* **Decentralized Storage**: Files are stored on IPFS, ensuring fault tolerance and resistance to single-point failures.
* **Wallet-Based Authentication**: Users authenticate and interact with the platform via MetaMask.
* **Access Control**: File owners can grant or revoke access using blockchain transactions.
* **User-Friendly Frontend**: Built with React for a clean and modern user interface.
* **Backend API**: Powered by Node.js and Express for communication between blockchain, IPFS, and the frontend.

---

## Tech Stack

* **Frontend**: React, JavaScript, HTML, CSS
* **Backend**: Node.js, Express.js
* **Blockchain**: Ethereum, Solidity (Smart Contracts)
* **Storage**: IPFS (InterPlanetary File System)
* **Authentication**: MetaMask wallet integration
* **Development Tools**: Truffle, Ganache, Web3.js, IPFS

---

## Project Architecture

1. **Frontend (React)**: Provides user interaction for file upload, retrieval, and access control.
2. **Backend (Node.js/Express)**: Handles IPFS integration and communication with blockchain.
3. **Smart Contracts (Solidity)**: Deployed on Ethereum using Truffle for ownership and permission management.
4. **IPFS**: Stores files in a distributed manner and generates unique content hashes.
5. **MetaMask**: Connects users’ wallets to the dApp for secure authentication and transaction signing.

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [MetaMask](https://metamask.io/) extension in your browser
* [Truffle](https://trufflesuite.com/)
* [Ganache](https://trufflesuite.com/ganache/) for local blockchain testing
* [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) or IPFS daemon running locally

### Clone Repository

```bash
git clone https://github.com/yourusername/DecentralizedDataVault.git
cd DecentralizedDataVault
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and add:

```env
RPC_URL=your_rpc_provider_url
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=your_deployed_contract_address
IPFS_API_URL=http://localhost:5001
```

Run the backend server:

```bash
node server.js
```

### Smart Contracts (Truffle)

Compile the smart contracts:

```bash
truffle compile
```

Deploy to local blockchain (Ganache):

```bash
truffle migrate --network development
```

Run Truffle console for testing:

```bash
truffle console
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Usage

1. Connect your MetaMask wallet to the dApp.
2. Upload files, which are stored on IPFS and recorded on the blockchain.
3. Manage access permissions through the smart contract interface.
4. Retrieve and download files securely using the generated IPFS hash.

---

## Future Enhancements

* Role-based access control for organizations.
* File encryption before uploading to IPFS for additional security.
* Multi-chain support (Polygon, Binance Smart Chain, etc.).
* Advanced analytics for storage usage and access history.

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

