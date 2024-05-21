const VotingSystem = artifacts.require("VotingSystem");

contract("VotingSystem", accounts => {
  let votingSystem;

  before(async () => {
    votingSystem = await VotingSystem.deployed();
  });

  it("should allow owner to add a candidate", async () => {
    await votingSystem.addCandidate("Balenciaga", { from: accounts[0] });
    const candidateCount = await votingSystem.getCandidatesCount();
    assert.equal(candidateCount.toNumber(), 1, "There should be one candidate registered.");
  });

  it("should not allow adding a candidate with a duplicate name", async () => {
    await votingSystem.addCandidate("Comme des Gar\u00E7ons", { from: accounts[0] });
    try {
      await votingSystem.addCandidate("Comme des Gar\u00E7ons", { from: accounts[0] });
      assert.fail("Should not have allowed adding a candidate with a duplicate name");
    } catch (error) {
      assert.include(error.message, "Candidate name must be unique", "The error message should contain 'Candidate name must be unique'");
    }
  });

  it("should not allow a non-owner to add a candidate", async () => {
    try {
      await votingSystem.addCandidate("Brunello Cucinelli", { from: accounts[1] });
      assert.fail("The non-owner was able to add a candidate");
    } catch (error) {
      assert.include(error.message, "revert", "The error message should contain 'revert'");
    }
  });

  it("should allow users to vote", async () => {
    await votingSystem.addCandidate("Loro Piana", { from: accounts[0] });
    await votingSystem.vote(3, { from: accounts[1] });
    const candidate = await votingSystem.getCandidate(3);
    assert.equal(candidate.voteCount.toNumber(), 1, "User should have 1 vote.");
  });

  it("should not allow users to vote more than once", async () => {
    try {
      await votingSystem.vote(1, { from: accounts[1] });
      assert.fail("The user was able to vote more than once");
    } catch (error) {
      assert.include(error.message, "Already voted", "The error message should contain 'Already voted'");
    }
  });

  it("should correctly calculate the vote percentage for a candidate", async () => {
    await votingSystem.addCandidate("Rick Owens", { from: accounts[0] });
    await votingSystem.addCandidate("Berluti", { from: accounts[0] });
    await votingSystem.vote(4, { from: accounts[2] });
    await votingSystem.vote(4, { from: accounts[3] });
    await votingSystem.vote(5, { from: accounts[4] });

    const votePercentage = await votingSystem.getVotePercentage(4);
    assert.equal(votePercentage.toNumber(), 50, "Vote percentage for Rick Owens should be 50%");
  });

  it("should accept donations", async () => {
    const donationAmount = web3.utils.toWei("1", "ether");
    await votingSystem.donate({ from: accounts[1], value: donationAmount });
    const contractBalance = await web3.eth.getBalance(votingSystem.address);
    assert.equal(contractBalance, donationAmount, "Contract should have the correct amount of donations.");
  });

  it("should allow owner to withdraw funds", async () => {
    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await votingSystem.withdrawFunds({ from: accounts[0] });
    const newBalance = await web3.eth.getBalance(accounts[0]);
    assert.isTrue(new web3.utils.BN(newBalance).gt(new web3.utils.BN(initialBalance)), "Owner should have more ETH after withdrawal.");
  });
});