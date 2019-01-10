const SHA256 = require('crypto-js/sha256')

// We imported our hashing algo - SHA256

// BLOCK CLASS
// Add the pieces of the block
// for now data will represent our transactions

class Block {
  // constructor(index, timestamp, data, previousHash) {
  //   this.index = index
  //   this.timestamp = timestamp
  //   this.data = data
  //   this.previousHash = previousHash
  //   this.hash = this.calculateHash()
  // }

  // Here we will hash the contents of our block
  // SHA256 returns this as an object so we need to convert this to a string
  calculateHash() {
    // return SHA256(
    //   this.data + this.previousHash + this.timestamp + JSON.stringify(this.data)
    // ).toString()
  }
}

// BLOCKCHAIN CLASS
// the constructor function initialzes our blockchain --> ARRAY of Blocks
// for now "data" will represent our transactions

class Blockchain {
  // initialize the chain with the genesis block
  // constructor() {
  //   this.chain = [this.createGenesisBlock()]
  // }

  // The first block on the blockchain is called the genesis block
  // This needs to be added MANUALLY
  // this timestamp is arbitrary for now
  // Since we do not have a previous hash this can be any random data

  createGenesisBlock() {
    // return new Block(0, '01/01/2017', 'Genesis Block', '0')
  }

  // ADD a method to return the latest block on the chain

  getLatestBlock() {
    // return this.chain[this.chain.length - 1]
  }

  // ADD a method thatadds a new block to the chain
  // Before we just add a new block to the chain we need SET the previous block's hash
  // Then we need to recalculate the hash since we changed the block

  // In real blockchains we cannot add a new block so easily.
  // Typically there are checks in plave such as "proof of work" before a block can be added.

  addBlock(newBlock) {
    // newBlock.previousHash = this.getLatestBlock().hash
    // newBlock.hash = newBlock.calculateHash()
    // this.chain.push(newBlock)
  }

  // 👉 Let's test what we have so far

  // NOTE we do not start from block 0

  isChainValid() {
    // for (let i = 1; i < this.chain.length; i++) {
    //   const currentBlock = this.chain[i]
    //   const previousBlock = this.chain[i - 1]
    //   // Check if the block is still valid
    //   if (currentBlock.hash !== currentBlock.calculateHash()) {
    //     return false
    //   }
    //   // Check if blocks point to prev. block
    //   if (currentBlock.previousHash !== previousBlock.hash) {
    //     return false
    //   }
    // }
    // return true
  }

  //
}

// 👉 1st Test
// const CharJSCoin = new Blockchain()
// CharJSCoin.addBlock(new Block(1, '10/07/2017', { amount: 4 }))
// CharJSCoin.addBlock(new Block(2, '10/17/2017', { amount: 10 }))
// console.log(JSON.stringify(CharJSCoin, null, 4))
// 👉 1st Test

// NOTE the genesis block
// CHECK does each block reference the previous block?
// Now, lets add a that method to check for validity.

// 👌 2nd Test
// const CharJSCoin = new Blockchain()
// CharJSCoin.addBlock(new Block(1, '10/07/2017', { amount: 4 }))
// CharJSCoin.addBlock(new Block(2, '10/17/2017', { amount: 10 }))
// console.log('Is chain vaild? ', CharJSCoin.isChainValid())
// CharJSCoin.chain[1].data = { amount: 100 }
// CharJSCoin.chain[1].hash = CharJSCoin.chain[1].calculateHash()
// console.log('Is chain vaild? ', CharJSCoin.isChainValid())
// 👌 2nd Test

// The relationship to the previous block has been broken.
// In real blockchains there are mechanisms to roll back changes to a valid state.
// Lacks features of proof of work/p2p network/checks for funds to make a transactrion.
