// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingSystem.sol";

contract VotingHelper {
    VotingSystem votingSystem;

    constructor(address votingSystemAddress) {
        votingSystem = VotingSystem(votingSystemAddress);
    }

    function getVoteCountForCandidate(
        uint candidateId
    ) public view returns (uint) {
        VotingSystem.Candidate memory candidate = votingSystem.getCandidate(
            candidateId
        );
        return candidate.voteCount;
    }
}
