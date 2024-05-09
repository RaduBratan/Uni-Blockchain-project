// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    mapping(address => bool) public isCandidate;
    uint public candidatesCount;
    address public owner;

    event NewCandidate(uint candidateId, string name);
    event Voted(address indexed voter, uint candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory name) public onlyOwner {
        candidatesCount++;
        uint candidateId = candidatesCount;
        candidates[candidateId] = Candidate(candidateId, name, 0);
        isCandidate[msg.sender] = true;
        emit NewCandidate(candidateId, name);
    }

    function vote(uint candidateId) external {
        require(!voters[msg.sender], "Already voted");
        require(!isCandidate[msg.sender], "Candidates cannot vote");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;
        emit Voted(msg.sender, candidateId);
    }

    function getCandidate(uint candidateId) external view returns (Candidate memory) {
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID");
        return candidates[candidateId];
    }
}