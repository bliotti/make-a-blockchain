const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(
      this.data +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString()
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++
      this.hash = this.calculateHash()
    }

    console.log(('Block mined!', this.hash))
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 4
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2017', 'Genesis Block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    // newBlock.hash = newBlock.calculateHash()
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock)
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }
}

const CharJSCoin = new Blockchain() //?

console.log('Mining Block')
CharJSCoin.addBlock(new Block(1, '01/01/18', { amount: 4 })) /*?.*/

console.log('Mining Block')
CharJSCoin.addBlock(new Block(1, '01/01/18', { amount: 10 }))

// CharJSCoin.addBlock(new Block(1, '10/07/2017', { amount: 4 }))
// CharJSCoin.addBlock(new Block(2, '10/17/2017', { amount: 10 }))

// console.log(JSON.stringify(CharJSCoin, null, 4))
// console.log('Is vaild? ', CharJSCoin.isChainValid())

// CharJSCoin.chain[1].data = { amount: 100 }
// CharJSCoin.chain[1].hash = CharJSCoin.chain[1].calculateHash()

// console.log('Is vaild? ', CharJSCoin.isChainValid())
