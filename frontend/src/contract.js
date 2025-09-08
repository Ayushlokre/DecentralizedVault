import { ethers } from "ethers";
import IPFSStorage from "./IPFSStorage.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const contract = new ethers.Contract(contractAddress, IPFSStorage.abi, signer);

export default contract;
