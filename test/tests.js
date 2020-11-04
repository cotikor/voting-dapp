const Election = artifacts.require("./Election.sol");

contract("Election Contract", function (accounts) {
  let electionInstance;
  
  before(async () => {
    electionInstance = await Election.deployed();
  });
/* POSITIVE TESTS */
    it("Should return the correct number of proposals", async () => {
        let result = await electionInstance.getNumberOfProposals();
        assert.equal(5, result)
    })
  it("Should accept valid registration of a voter from the election official", async () => {
    let result = await electionInstance.register(accounts[1], {
      from: accounts[0],
    });
    assert.equal(true, result.receipt.status, "Registration is valid.");
  });
    it('Should correctly return the number of registered voters', async () => {
       await electionInstance.register(accounts[2], {
         from: accounts[0],
       });
        await electionInstance.register(accounts[3], {
          from: accounts[0],
        });
        let result = await electionInstance.countRegisteredVoters()
        assert.equal(3, result)
  })

});

// it("Should accept valid voting on proposals", function () {
//   return electionInstance
//     .vote([0,1,1,0,1], { from: accounts[1] })
//     .then(function (result) {
//         assert.equal("0x1", result.receipt.status, "Voting is done");
//         console.log(electionInstance.vote([1, 0, 1, 0, 1], { from: accounts[2] }))
//       return electionInstance.vote([1, 0, 1, 0, 1], { from: accounts[2] });
//     })
//     .then(function (result) {
//       assert.equal("0x1", result.receipt.status, "Voting is done");
//       return electionInstance.vote([1, 1, 1, 1, 1], { from: accounts[3] });
//     })
//     .then(function (result) {
//       assert.equal("0x1", result.receipt.status, "Voting is done");
//     });
// });
