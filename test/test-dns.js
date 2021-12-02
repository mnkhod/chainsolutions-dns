const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require('@openzeppelin/test-helpers');


describe("Testing DNS", function () {
  let instance;
  let accounts;

  beforeEach(async function() {
    accounts = await ethers.getSigners();
    let dnsContract = await ethers.getContractFactory("DNS");
    instance = await dnsContract.deploy();
  });
  
  it("testing -- getOwner()", async function () {
    expect(await instance.getOwner()).to.equal(accounts[0].address)
  });


  it("testing -- addToDNS() , getFromDNS()", async function () {
    await instance.connect(accounts[1]).addToDNS("temka")
    expect(await instance.getFromDNS(accounts[1].address)).to.equal("temka")
  });

  it("testing -- addToDNS() check exception 'domain already registered' ", async function () {
    await instance.connect(accounts[1]).addToDNS("temka");
    await expectRevert(instance.connect(accounts[1]).addToDNS("temka"), "error: domain already registered");
  });

  it("testing -- getFromDNS() check exception 'address is empty' ", async function () {
    await expectRevert(instance.getFromDNS("0x0000000000000000000000000000000000000000"), "error: address is empty");
  });

});