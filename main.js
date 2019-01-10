const SHA256 = require('crypto-js/sha256')

// Make this more like a simple cryptocurrency
// #1 block can contain multiple transactions
// #2 add rewards for miners

// We need to introduce virtual money through mining rewards
// Mining rewards steadly introduce money into the system.

// Lets modify the block class to receive transactions instead of data

// removed the index since the order of blocks is determined by the position in the array
// also remove it from the createGenesisBlock method

class Block {
  constructor(
    timestamp,
    //  transactions,
    previousHash
  ) {
    this.timestamp = timestamp
    // this.transactions = transactions
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(
      this.transactions +
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
      this.nonce++ //?
      this.hash = this.calculateHash()
    }

    console.log('Block Mined!', this.hash)
  }
}

// Lets define what a transaction looks like by creating a new Transaction class

// class Transaction {
//   constructor(fromAddress, toAddress, amount) {
//     this.fromAddress = fromAddress
//     this.toAddress = toAddress
//     this.amount = amount
//   }
// }

// Now lets work on our main blockchain class

// #1 Add mining reward
// #2 Add a place to store pending transactions
// #3 Add a new method to mine a new block for the pending transactions

// Since we want to only create blocks on a speceifc interval (10 mins on Bitcoin)
// all trans made between blocks are temp stored in a pending trans array in (mempool)

// add pending transactions
// add mining reward

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 4
    // this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block('01/01/2017', 'Genesis Block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // Lets remove the old addBlock method and replace it with minePendingTransactions
  // takes in a miningrewardaddress (string)

  // When a miner calls this method, they pass along their address to recieve the reward
  // if they are able to successfully mine the block

  //

  // minePendingTranscations(miningRewardAddress) {
  //   let block = new Block(
  //     Date.now(),
  //     this.pendingTransactions,
  //     this.getLatestBlock().hash
  //   )
  //   // mine the block
  //   block.mineBlock(this.difficulty)
  //   // Once complete log success and add it to the chain
  //   console.log('Block successfully mined!')
  //   this.chain.push(block)
  //   // Now we need to reset the pending transactions array
  //   // also we create a new trans to give the miner his reward in the next block
  //   // Their is no from address in a mining reward (called coinbase transaction)
  //   this.pendingTransactions = [
  //     new Transaction(null, miningRewardAddress, this.miningReward)
  //   ]
  // }

  // printBlocks() {
  //   for (const block of this.chain) {
  //     console.log('======================\n', JSON.stringify(block, null, 4))
  //   }
  // }

  // miners choose transactions since blocks cannot be more than 1Mb (fee)

  //// addBlock(newBlock) {
  //// newBlock.previousHash = this.getLatestBlock().hash
  //// newBlock.mineBlock(this.difficulty)
  //// this.chain.push(newBlock)
  //// }

  // add a new method called createTransaction to add a trans. to the pendingTransactions array

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction)
  }

  // Finally lets create a method to get the balance of an address

  // NOTE their are really no balances in a blockchain
  // trans are just stored on the chain therefore one must iterate
  // through the chain to check for amounts asssociated with their address
  // to calculate their balance

  //

  // getBalanceOfAddress(address) {
  //   // start balance at zero
  //   let balance = 0

  //   // nested for loops yeeeaaa....
  //   // loop over all the blocks in the chain
  //   for (const block of this.chain) {
  //     // loop over all the trans in a block
  //     for (const trans of block.transactions) {
  //       // if you are the fromAddress deduct
  //       if (trans.fromAddress === address) {
  //         balance -= trans.amount
  //       }
  //       // if you are the toAddress increase
  //       if (trans.toAddress === address) {
  //         balance += trans.amount
  //       }
  //     }
  //   }

  //   return balance
  // }

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

// 🌶 TEST
// const CharJSCoin = new Blockchain()
// CharJSCoin.createTransaction(new Transaction('address 1', 'address 2', 100))
// CharJSCoin.createTransaction(new Transaction('address 2', 'address 1', 50))

// console.log('\n Starting the miner...')
// CharJSCoin.minePendingTranscations('Charlie')

// console.log('Balance: ', CharJSCoin.getBalanceOfAddress('Charlie'))

// CharJSCoin.minePendingTranscations('Charlie')
// console.log('Balance: ', CharJSCoin.getBalanceOfAddress('Charlie'))
// 🌶 TEST
