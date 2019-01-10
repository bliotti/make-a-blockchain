const SHA256 = require('crypto-js/sha256')

// Right now we can create new blocks quickly (add a transaction, compute hash, add to chain)
// We dont want a bunch of people add hundreds of blocks and spam the chain

// There is also a security issue - one can change the contents of a block
// and recalc all the hashes and make a valid chain, eventhough you tampered with it.

// Solution -- Proof of Work or (mining)
// Need to prove that one used alot of computing power (OR ENDURED A COST) to add a block to the chain

// How do we do this?

// req. the hash of a block to start with a specific amount of zeros.
// since we cannot influnce the output of a hash, we have to guess and check, which
// req. alot of computing power. (OR COST)
// this is called the difficulty (ratio) and the TARGET is the req. amount of zeros
// this difficulty is adjusted over time (# of blocks) such that a new block is produced
// every 10 minutes. (diff increases due to advances in processing power)

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    // this.nonce = 0
  }

  calculateHash() {
    return SHA256(
      this.data + this.previousHash + this.timestamp + JSON.stringify(this.data)
      // + this.nonce
    ).toString()
  }

  // add new method called mineblock that takes in an argument (num) difficulty

  // mineBlock(difficulty) {
  //   // create a while loop that keeps checking if the hash of the block fulfills diff. requirment
  //   // this is an endless loop unless we add a nonce value
  //   // random number to change the hash
  //   while (
  //     this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
  //   ) {
  //     this.nonce++
  //     this.hash = this.calculateHash()
  //   }
  //   console.log(('Block mined:', this.hash))
  //   console.log('Nonce ', this.nonce)
  // }
}

// Lets update our blockchain with the mineBlock method

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    // this.difficulty = 2
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2017', 'Genesis Block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // change the calculateHash method with our new mineblock method

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    //// newBlock.hash = newBlock.calculateHash() // old method
    // newBlock.mineBlock(this.difficulty)
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

// 🍓 TEST
const CharJSCoin = new Blockchain() //?

console.log('Mining Block 1...')
CharJSCoin.addBlock(new Block(1, '01/01/18', { amount: 4 })) /*?.*/

console.log('Mining Block 2...')
CharJSCoin.addBlock(new Block(1, '01/01/18', { amount: 10 }))
// 🍓 TEST

// NOTE that the hashes started with 2 zeros
// Still happened fairly quickly
// Lets increase the difficulty!
