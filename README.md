
```markdown
# Decentralized Vault 🗄️

A **Decentralized File Storage System** built on blockchain and IPFS, allowing users to securely upload, retrieve, and manage files without relying on centralized servers. This project combines **Ethereum smart contracts, Web3, IPFS, and Node.js/React** to create a full-stack decentralized application.

---

## 🚀 Project Overview

**Decentralized Vault** is a secure and transparent file storage system where:

- Users can upload files to IPFS.
- The file CID is stored on a blockchain smart contract.
- Users can retrieve files or view metadata (owner, timestamp, total files).
- Provides complete decentralization, making data tamper-proof.

---

## 🏗️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Blockchain:** Ethereum / Polygon (Amoly Testnet)
- **Smart Contracts:** Solidity
- **Storage:** IPFS
- **Web3 Interaction:** Web3.js
- **Development Tools:** Truffle, Ganache

---

## ⚙️ Features

- Upload single or multiple files to IPFS.
- Retrieve file details by ID.
- View total number of uploaded files.
- Smart contract deployed on **Amoly Testnet**.
- Node.js backend handles interaction with blockchain.
- Frontend provides a user-friendly interface for file management.

---

## 🗂️ Project Structure

```

DecentralizedVault/
│
├── backend/             # Node.js backend for smart contract interaction
│   ├── contract.js      # Script to interact with deployed smart contract
│   ├── checkBalance.js  # Script to check wallet balance on Amoly Testnet
│   ├── IPFSStorage.json # ABI of the deployed smart contract
│   ├── package.json
│   ├── package-lock.json
│   └── .env             # Environment variables (PRIVATE\_KEY, RPC\_URL, CONTRACT\_ADDRESS)
│
├── frontend/            # React frontend for user interface
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── contracts/           # Solidity smart contracts
│   └── IPFSStorage.sol
│
├── migrations/          # Truffle migrations for contract deployment
│
└── truffle-config.js    # Truffle configuration file

````

---

## ⚡ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Ayushlokre/DecentralizedVault.git
cd DecentralizedVault
````

### 2. Backend Setup

```bash
cd backend
npm install
```

* Create `.env` file:

```env
PRIVATE_KEY=<Your Wallet Private Key>
RPC_URL=<Your Amoly Testnet RPC URL>
CONTRACT_ADDRESS=<Deployed Contract Address>
```

* Test smart contract interaction:

```bash
node contract.js
node checkBalance.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

* Runs the React app on `http://localhost:3000`.

---

### 4. Smart Contract Deployment

* **Truffle** was used to compile and deploy `IPFSStorage.sol`.
* Deployment commands:

```bash
truffle compile
truffle migrate --network amoly --reset
```

* Contract deployed at: `0x806C09492AF269eA9fC3497609E147441E601C9E` (Amoly Testnet).

---

## 📝 Example Backend Scripts

**Upload a file (CID)**:

```js
await uploadFile('QmExampleCID123456');
```

**Get file details**:

```js
await getFile(1);
```

**Get total files**:

```js
await totalFiles();
```

---

## 📌 Notes

* Make sure your wallet has test tokens on **Amoly Testnet** to perform transactions.
* Use valid CIDs for uploading files.
* The frontend interacts with the backend API to handle file uploads and retrieval.

---

## 🔗 Useful Links

* [Amoly Testnet Explorer](https://amoly.polygonscan.com)
* [IPFS Docs](https://docs.ipfs.io/)
* [Truffle Docs](https://www.trufflesuite.com/docs)
* [Web3.js Docs](https://web3js.readthedocs.io/)

---

## 👨‍💻 Author

**Ayush Lokre**

* GitHub: [https://github.com/Ayushlokre](https://github.com/Ayushlokre)
* Email: [ayushlokre007@gmail.com](mailto:ayushlokre007@gmail.com)

---

```

---

