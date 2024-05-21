// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

interface IVotingSystem {
    function addCandidate(string calldata name) external;
    function vote(uint candidateId) external;
    function getCandidate(
        uint candidateId
    ) external view returns (string memory name, uint voteCount);
}

library StringUtils {
    function isNameInList(
        string[] memory names,
        string memory newName
    ) internal pure returns (bool) {
        for (uint i = 0; i < names.length; i++) {
            if (keccak256(bytes(names[i])) == keccak256(bytes(newName))) {
                return true;
            }
        }
        return false;
    }
}

library VoteUtils {
    function calculateVotePercentage(
        uint totalVotes,
        uint candidateVotes
    ) internal pure returns (uint) {
        if (totalVotes == 0) {
            return 0;
        }
        return (candidateVotes * 100) / totalVotes;
    }
}

contract VotingSystem is Ownable, IVotingSystem {
    using StringUtils for string;
    using VoteUtils for uint;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    mapping(address => bool) public isCandidate;
    uint public candidatesCount;

    event NewCandidate(uint candidateId, string name);
    event Voted(address indexed voter, uint candidateId);
    event DonationReceived(address donor, uint amount);

    function addCandidate(string memory name) public override onlyOwner {
        string[] memory existingNames = new string[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            existingNames[i - 1] = candidates[i].name;
        }
        require(
            !StringUtils.isNameInList(existingNames, name),
            "Candidate name must be unique"
        );

        candidatesCount++;
        uint candidateId = candidatesCount;
        candidates[candidateId] = Candidate(candidateId, name, 0);
        isCandidate[msg.sender] = true;
        emit NewCandidate(candidateId, name);
    }

    function vote(uint candidateId) external override {
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
    ) external view override returns (string memory name, uint voteCount) {
        require(
            candidateId > 0 && candidateId <= candidatesCount,
            "Invalid candidate ID"
        );
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }

    function getCandidatesCount() public view returns (uint) {
        return candidatesCount;
    }

    function donate() public payable {
        emit DonationReceived(msg.sender, msg.value);
    }

    function withdrawFunds() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function getVotePercentage(uint candidateId) public view returns (uint) {
        require(
            candidateId > 0 && candidateId <= candidatesCount,
            "Invalid candidate ID"
        );
        uint totalVotes = 0;
        for (uint i = 1; i <= candidatesCount; i++) {
            totalVotes += candidates[i].voteCount;
        }
        uint percentage = VoteUtils.calculateVotePercentage(
            totalVotes,
            candidates[candidateId].voteCount
        );
        return percentage;
    }
}
