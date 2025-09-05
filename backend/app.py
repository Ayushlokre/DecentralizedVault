import json
import os
from web3 import Web3
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
RPC_URL = os.getenv("RPC_URL")
CONTRACT_ADDRESS = Web3.to_checksum_address(os.getenv("CONTRACT_ADDRESS"))

# Load ABI
with open("IPFSStorage.json") as f:
    ABI = json.load(f)

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider(RPC_URL))
account = w3.eth.account.from_key(PRIVATE_KEY)
print(f"Using account: {account.address}")

# Contract instance
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)

# ------------------ Functions ------------------

def upload_file(cid: str):
    """Upload a single IPFS CID to the contract"""
    nonce = w3.eth.get_transaction_count(account.address)
    txn = contract.functions.uploadFile(cid).build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": 200000,
        "gasPrice": w3.to_wei('20', 'gwei')
    })
    signed_txn = w3.eth.account.sign_transaction(txn, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transaction sent: {tx_hash.hex()}")

    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transaction mined!")

    # Decode the FileUploaded event
    logs = contract.events.FileUploaded().process_receipt(receipt)
    if logs:
        file_id = logs[0]['args']['id']
        print(f"Uploaded file ID: {file_id}")
        return file_id
    else:
        print("No FileUploaded event found")
        return None

def upload_files(cids: list):
    """Upload multiple IPFS CIDs at once"""
    nonce = w3.eth.get_transaction_count(account.address)
    txn = contract.functions.uploadFiles(cids).build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": 500000 + 100000 * len(cids),  # Gas estimate
        "gasPrice": w3.to_wei('20', 'gwei')
    })
    signed_txn = w3.eth.account.sign_transaction(txn, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transaction sent: {tx_hash.hex()}")

    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transaction mined!")

    logs = contract.events.FileUploaded().process_receipt(receipt)
    file_ids = [log['args']['id'] for log in logs]
    print(f"Uploaded file IDs: {file_ids}")
    return file_ids

def get_file(file_id: int):
    """Fetch file metadata from the contract"""
    cid, owner, timestamp = contract.functions.getFile(file_id).call()
    return {
        "cid": cid,
        "owner": owner,
        "timestamp": timestamp
    }

def total_files():
    """Get total number of files uploaded"""
    return contract.functions.totalFiles().call()

# ------------------ Example Usage ------------------

if __name__ == "__main__":
    print("\n--- Single File Upload ---")
    file_id = upload_file("QmTestCID123456789")  # Replace with real IPFS CID

    print("\n--- Fetching File Metadata ---")
    if file_id is not None:
        file_data = get_file(file_id)
        print(file_data)

    print("\n--- Batch File Upload ---")
    batch_ids = upload_files([
        "QmCID1Example",
        "QmCID2Example",
        "QmCID3Example"
    ])  # Replace with real CIDs

    print("\n--- Fetching All Files ---")
    for fid in batch_ids:
        print(get_file(fid))

    print(f"\nTotal files uploaded: {total_files()}")
