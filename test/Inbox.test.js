const ganache = require("ganache");
const { Web3 } = require("web3");
const assert = require("assert");
const { interface, bytecode } = require("../compile");
// const ganache = require("ganache");
// const { Web3 } = require("web3");
// const assert = require("assert");
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const initial_string = "Hi there";
beforeEach(async () => {
  // Get a list of accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [initial_string],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.method.message().call();
    assert.equal(message, initial_string);
  });
});

/******  Test code ********/

// updated ganache and web3 imports added for convenience
// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }
// let car;
// beforeEach(() => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });
//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
// // contract test code will go here
