const VotingSystem = artifacts.require("VotingSystem");
const VotingHelper = artifacts.require("VotingHelper");

module.exports = function(deployer) {
  deployer.deploy(VotingSystem).then(function() {
    return deployer.deploy(VotingHelper, VotingSystem.address);
  });
};