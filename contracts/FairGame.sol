// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract FairGame {
    address payable public owner;
    uint256 seed;
    mapping(address => uint256) public users;

    constructor() payable {
        owner = payable(msg.sender);
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function deposit() public payable {
        users[msg.sender] += msg.value;
    }

    function bet(uint256 amount) public {
        require(amount < users[msg.sender], "Please enter a valid bet amount.");
        seed = (block.difficulty + block.timestamp + seed) % 100;
        if (seed > 50) {
            users[msg.sender] += amount;
        } else {
            users[msg.sender] -= amount;
        }
    }

    function withdrawal(uint256 amount) public {
        require(
            amount <= users[msg.sender],
            "Please enter a valid withdrawal amount."
        );
        users[msg.sender] -= amount;
        (bool success, ) = (msg.sender).call{value: amount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function withdrawAll() public {
        require(msg.sender == owner, "You aren't the owner");
        owner.transfer(address(this).balance);
    }
}
