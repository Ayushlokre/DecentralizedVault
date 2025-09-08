// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSStorage {
    address public owner;

    struct File {
        address owner;
        string cid;
        uint256 timestamp;
        bool deleted;  // New flag to mark deletion
    }

    File[] public files;

    // Events
    event FileUploaded(uint256 indexed id, address indexed owner, string cid, uint256 timestamp);
    event FileDeleted(uint256 indexed id, address indexed owner);

    constructor() {
        owner = msg.sender;
    }

    // Upload a new file
    function uploadFile(string memory _cid) public {
        uint256 id = files.length;
        files.push(File(msg.sender, _cid, block.timestamp, false));
        emit FileUploaded(id, msg.sender, _cid, block.timestamp);
    }

    // Mark a file as deleted
    function deleteFile(uint256 _id) public {
        require(_id < files.length, "File does not exist");

        File storage f = files[_id];
        require(!f.deleted, "File already deleted");
        require(f.owner == msg.sender, "Only owner can delete");

        // Mark as deleted instead of deleting array element
        f.deleted = true;
        f.cid = "";
        f.timestamp = 0;

        emit FileDeleted(_id, msg.sender);
    }

    // Get number of files
    function getFileCount() public view returns (uint256) {
        return files.length;
    }

    // Get a file's info
    function getFile(uint256 _id) public view returns (address fileOwner, string memory cid, uint256 timestamp, bool deleted) {
        require(_id < files.length, "File does not exist");
        File storage f = files[_id];
        return (f.owner, f.cid, f.timestamp, f.deleted);
    }
}
