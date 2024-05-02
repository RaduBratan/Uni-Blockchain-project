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
        string[11] memory candidateNames = [
            "Balenciaga",
            "Fendi",
            "Rick Owens",
            "Maison Margiela",
            "Comme des Gar\u00E7ons",
            "Loro Piana",
            "Brunello Cucinelli",
            "Corneliani",
            "Cesare Attolini",
            "Ermenegildo Zegna",
            "Berluti"
        ];
        for (uint i = 0; i < candidateNames.length; i++) {
            addCandidate(candidateNames[i]);
        }
    }

    function addCandidate(string memory name) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
        emit NewCandidate(candidatesCount, name);
    }

    function vote(uint candidateId) external {
        require(!voters[msg.sender], "Already voted");
        require(
            candidateId > 0 && candidateId <= candidatesCount,
            "Invalid candidate ID"
        );

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;
        emit Voted(msg.sender, candidateId);
    }

    function getCandidate(
        uint candidateId
    ) external view returns (Candidate memory) {
        require(
            candidateId > 0 && candidateId <= candidatesCount,
            "Invalid candidate ID"
        );
        return candidates[candidateId];
    }

    function sendEther(address payable recipient) external payable onlyOwner {
        recipient.transfer(msg.value);
    }
}
