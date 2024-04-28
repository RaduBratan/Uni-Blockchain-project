const VotingSystem = artifacts.require("VotingSystem");

contract("VotingSystem", accounts => {
  let votingSystem;

  before(async () => {
    votingSystem = await VotingSystem.deployed();
  });

  it("should allow owner to add a candidate", async () => {
    await votingSystem.addCandidate("Alice", { from: accounts[0] });
    const candidate = await votingSystem.getCandidate(1);
    assert.equal(candidate.name, "Alice", "The name of the first candidate should be Alice.");
  });

  it("should not allow a non-owner to add a candidate", async () => {
    try {
      await votingSystem.addCandidate("Bob", { from: accounts[1] });
      assert.fail("The non-owner was able to add a candidate");
    } catch (error) {
      assert.include(error.message, "revert", "The error message should contain 'revert'");
    }
  });

  it("should allow users to vote", async () => {
    await votingSystem.vote(1, { from: accounts[1] });
    const candidate = await votingSystem.getCandidate(1);
    assert.equal(candidate.voteCount, 1, "Candidate should have 1 vote.");
  });

  it("should not allow users to vote more than once", async () => {
    try {
      await votingSystem.vote(1, { from: accounts[1] });
      assert.fail("The user was able to vote more than once");
    } catch (error) {
      assert.include(error.message, "Already voted", "The error message should contain 'Already voted'");
    }
  });
});