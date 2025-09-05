// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract IPFSStorage {
    struct File {
        string cid;
        address owner;
        uint256 timestamp;
    }

    File[] public files;
    address public owner;

    // Events
    event FileUploaded(uint256 indexed id, string cid, address indexed owner, uint256 timestamp);
    event FileDeleted(uint256 indexed id, address indexed owner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // Errors
    error OwnableUnauthorizedAccount(address account);
    error OwnableInvalidOwner(address owner);

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert OwnableUnauthorizedAccount(msg.sender);
        _;
    }

    // Ownership functions
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
    }

    // File functions
    function uploadFile(string memory _cid) public returns (uint256) {
        uint256 id = files.length;
        files.push(File(_cid, msg.sender, block.timestamp));
        emit FileUploaded(id, _cid, msg.sender, block.timestamp);
        return id;
    }

    function uploadFiles(string[] memory _cids) public returns (uint256[] memory ids) {
        ids = new uint256[](_cids.length);
        for (uint i = 0; i < _cids.length; i++) {
            ids[i] = uploadFile(_cids[i]);
        }
    }

    function getFile(uint256 _id) public view returns (string memory cid, address fileOwner, uint256 timestamp) {
        require(_id < files.length, "File does not exist");
        File memory f = files[_id];
        return (f.cid, f.owner, f.timestamp);
    }

    function deleteFile(uint256 _id) public {
        require(_id < files.length, "File does not exist");
        File memory f = files[_id];
        require(f.owner == msg.sender, "Only owner can delete");
        delete files[_id];
        emit FileDeleted(_id, msg.sender);
    }

    function exists(uint256 _id) public view returns (bool) {
        return _id < files.length && files[_id].owner != address(0);
    }

    function totalFiles() public view returns (uint256) {
        return files.length;
    }
}
