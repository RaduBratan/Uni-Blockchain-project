// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;

    // event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
        // emit OwnershipTransferred(address(0), msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // function transferOwnership(address newOwner) public onlyOwner {
    //     require(newOwner != address(0), "New owner is the zero address");
    //     emit OwnershipTransferred(owner, newOwner);
    //     owner = newOwner;
    // }
}