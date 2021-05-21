const { expect } = require('chai')

describe('CoinCoin Token', function () {
  let CoinCoin, coincoin, dev, owner, alice, bob, charlie, dan, eve
  const NAME = 'CoinCoin'
  const SYMBOL = 'COIN'
  const INITIAL_SUPPLY = ethers.utils.parseEther('8000000000')

  beforeEach(async function () {
    ;[dev, owner, alice, bob, charlie, dan, eve] = await ethers.getSigners()
    CoinCoin = await ethers.getContractFactory('CoinCoin')
    coincoin = await CoinCoin.connect(dev).deploy(owner.address, INITIAL_SUPPLY)
    await coincoin.deployed()
    /*
    Il faudra transférer des tokens à nos utilisateurs de tests lorsque la fonction transfer sera implementé
    await coincoin
      .connect(owner)
      .transfer(alice.address, ethers.utils.parseEther('100000000'))
      */
  })

  describe('Deployement', function () {
    it('Has name CoinCoin', async function () {
      expect(await coincoin.name()).to.equal(NAME)
    })
    it('Has symbol Coin', async function () {
      expect(await coincoin.symbol()).to.equal(SYMBOL)
    })
    it('mints initial Supply to owner', async function () {
      let coincoin = await CoinCoin.connect(dev).deploy(
        owner.address,
        INITIAL_SUPPLY
      )
      expect(await coincoin.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY)
    })

    it('emits event Transfer when mint totalSupply', async function () {
      /*
      Pb de récupération de l'event d'une transaction passée avec Waffle: Sofiane s'en occupe
      await expect(
        CoinCoin.connect(dev).deploy(
          owner.address,
          ethers.utils.parseEther('8000000000')
        )
      ).to.emit(, 'Transfer').withArgs(ethers.constants.AddressZero, owner.address, ethers.utils.parseEther('8000000000'));
      */
    })
  })

  describe('Allowance system', function () {
    // Tester le système d'allowance ici
  })
  describe('Token transfers', function () {
    it('transfers tokens from sender to receipient', async function () {})
    it('transferFrom tokens from sender to receipient', async function () {})
    it('emits event Transfer when transfer token', async function () {})
    it('emits event Transfer when transferFrom token', async function () {})
  })
})
