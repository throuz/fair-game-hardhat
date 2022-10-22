// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract FairGame {
    address payable public owner;
    uint seed;
    mapping(address => uint) public users;

    event BetResult(uint seed, uint amount, uint when);

    constructor() payable {
        owner = payable(msg.sender);
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function deposit() public payable {
        users[msg.sender] += msg.value;
    }

    function bet(uint amount) public {
        require(amount < users[msg.sender], "Please enter a valid bet amount.");
        seed = (block.difficulty + block.timestamp + seed) % 100;
        if (seed > 50) {
            users[msg.sender] += amount;
        } else {
            users[msg.sender] -= amount;
        }
        emit BetResult(seed, amount, block.timestamp);
    }

    function betByMartingale(uint times, uint amount) public {
        require(amount < users[msg.sender], "Please enter a valid bet amount.");
        uint nextAmount = amount;
        for (uint i = 0; i < times; i++) {
            require(
                nextAmount < users[msg.sender],
                "Insufficient balance, please deposit."
            );
            seed = (block.difficulty + block.timestamp + seed) % 100;
            if (seed > 50) {
                users[msg.sender] += nextAmount;
                nextAmount = amount;
            } else {
                users[msg.sender] -= nextAmount;
                nextAmount *= 2;
            }
            emit BetResult(seed, amount, block.timestamp);
        }
    }

    function betByAntiMartingale(uint times, uint amount) public {
        require(amount < users[msg.sender], "Please enter a valid bet amount.");
        uint nextAmount = amount;
        for (uint i = 0; i < times; i++) {
            require(
                nextAmount < users[msg.sender],
                "Insufficient balance, please deposit."
            );
            seed = (block.difficulty + block.timestamp + seed) % 100;
            if (seed > 50) {
                users[msg.sender] += nextAmount;
                nextAmount *= 2;
            } else {
                users[msg.sender] -= nextAmount;
                nextAmount = amount;
            }
            emit BetResult(seed, amount, block.timestamp);
        }
    }

    function withdraw(uint amount) public {
        require(
            amount <= users[msg.sender],
            "Please enter a valid withdraw amount."
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
