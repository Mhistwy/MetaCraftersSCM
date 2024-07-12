// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract WaveSpotSubscription {
    address payable public owner;

    enum SubscriptionType { Basic, Standard, Premium }
    struct Subscriber {
        string name;
        SubscriptionType subscriptionType;
    }

    mapping(address => Subscriber) public subscribers;

    event Subscribed(address subscriber, string name, SubscriptionType subscriptionType);

    constructor() {
        owner = payable(msg.sender);
    }

    function subscribe(string memory _name, SubscriptionType _subscriptionType) public payable {
        require(bytes(_name).length > 0, "Name is required");
        
        uint256 subscriptionCost;
        if (_subscriptionType == SubscriptionType.Basic) {
            subscriptionCost = 0.01 ether;
        } else if (_subscriptionType == SubscriptionType.Standard) {
            subscriptionCost = 0.05 ether;
        } else if (_subscriptionType == SubscriptionType.Premium) {
            subscriptionCost = 0.1 ether;
        }
        
        require(msg.value >= subscriptionCost, "Insufficient payment");

        subscribers[msg.sender] = Subscriber(_name, _subscriptionType);

        emit Subscribed(msg.sender, _name, _subscriptionType);
    }

    function getSubscription(address _subscriber) public view returns (string memory name, SubscriptionType subscriptionType) {
        Subscriber storage subscriber = subscribers[_subscriber];
        return (subscriber.name, subscriber.subscriptionType);
    }
}
