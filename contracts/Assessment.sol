// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Assessment {
    using SafeMath for uint256;

    address payable public owner;
    uint256 public totalBalance;
    mapping(address => uint256) public balances;
    mapping(address => uint256[]) public transactionHistory;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    constructor() {
        owner = payable(msg.sender);
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        totalBalance = totalBalance.add(msg.value);
        transactionHistory[msg.sender].push(msg.value);

        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) external {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(_amount <= balances[msg.sender], "Insufficient balance");

        balances[msg.sender] = balances[msg.sender].sub(_amount);
        totalBalance = totalBalance.sub(_amount);
        transactionHistory[msg.sender].push(-int256(_amount)); // Negative amount for withdrawals

        payable(msg.sender).transfer(_amount);

        emit Withdraw(msg.sender, _amount);
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function getTotalBalance() external view returns (uint256) {
        return totalBalance;
    }

    function getTransactionHistory(address _user) external view returns (uint256[] memory) {
        return transactionHistory[_user];
    }

    function emergencyWithdraw() external {
        require(msg.sender == owner, "Only owner can call this function");

        payable(owner).transfer(address(this).balance);
        totalBalance = 0;
    }
}
