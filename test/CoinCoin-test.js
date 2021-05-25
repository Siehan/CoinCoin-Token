const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoinCoin Token", function () {
  let CoinCoin, coincoin, dev, owner, alice, bob, charlie, dan, eve;
  const NAME = "CoinCoin";
  const SYMBOL = "COIN";
  const INITIAL_SUPPLY = ethers.utils.parseEther("100000000");

  beforeEach(async function () {
    [dev, owner, alice, bob, charlie, dan, eve] = await ethers.getSigners();
    CoinCoin = await ethers.getContractFactory(NAME);
    coincoin = await CoinCoin.connect(dev).deploy(owner.address, INITIAL_SUPPLY);
    await coincoin.deployed();
    /*
    Il faudra transférer des tokens à nos utilisateurs de tests lorsque la fonction transfer sera implementé
    await coincoin
      .connect(owner)
      .transfer(alice.address, ethers.utils.parseEther('100000000'))
      */
  });

  describe("Deployment", function () {
    it("Has name CoinCoin", async function () {
      expect(await coincoin.name()).to.equal(NAME);
    });

    it("Has symbol COIN", async function () {
      expect(await coincoin.symbol()).to.equal(SYMBOL);
    });

    it("Mints initial Supply to owner", async function () {
      let coincoin = await CoinCoin.connect(dev).deploy(owner.address, INITIAL_SUPPLY);
      expect(await coincoin.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("Emits event Transfer when mint initial supply to owner at deployement", async function () {
      /*
        On peut tester si un event a été emit depuis une transaction particulière.
        Le problème c'est qu'une transaction de déploiement ne nous retourne pas la transaction
        mais l'instance du smart contract déployé.
        Pour récupérer la transaction qui déploye le smart contract il faut utiliser l'attribut
        ".deployTransaction" sur l'instance du smart contract
      */
      let receipt = await coincoin.deployTransaction.wait();
      let txHash = receipt.transactionHash;
      await expect(txHash)
        .to.emit(coincoin, "Transfer")
        .withArgs(ethers.constants.AddressZero, owner.address, INITIAL_SUPPLY);
    });
  });

  describe("Allowance system", function () {
    // Tester le système d'allowance ici
    //"CoinCoin: transfer amount exceeds allowance"
  });

  describe("Token transfer", function () {
    it("Should transfer tokens from sender to recipient", async function () {
      await expect(coincoin.transfer).to.be.revertedWith("There is not enough funds to transfer");
    });

    it("Emits event Transfer when transfer token", async function () {
      await expect(transfer).to.emit(coincoin, "Transfer").withArgs(owner.address, charlie.address, INITIAL_SUPPLY);
    });

    describe("Token transferFrom", function () {
      it("transferFrom tokens from sender to recipient", async function () {
        await expect(coincoin.transfer(charlie.address, INITIAL_SUPPLY)).to.be.revertedWith(
          "There is not enough funds to transfer"
        );
      });
    });
  });
});
