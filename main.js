const SHA256 = require('crypto-js/sha256')

const { map } = require('ramda')

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }
}

class Block {
  constructor(timestamp, transactions, previousHash) {
    this.timestamp = timestamp
    this.transactions = transactions
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

    console.log('Block mined!', this.hash)
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 1
    this.pendingTransactions = []
    this.miningReward = 10
  }

  createGenesisBlock() {
    return new Block('01/01/2017', 'Genesis Block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // ! miners chose transactioms
  minePendingTranscations(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions) //?
    block.mineBlock(this.difficulty)

    console.log('Block Mined!')
    this.chain.push(block)

    // Could add more coins but P2P checks will not allow
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction)
  }

  getBalanceOfAddress(address) {
    let balance = 0

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount
        }

        if (trans.toAddress === address) {
          balance += trans.amount
        }
      }
    }

    return balance //?
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

const CharJSCoin = new Blockchain()

CharJSCoin.createTransaction(new Transaction('address 1', 'address 2', 100))
CharJSCoin.createTransaction(new Transaction('address 2', 'address 1', 50))

CharJSCoin.minePendingTranscations('charlie')

console.log(CharJSCoin.getBalanceOfAddress('charlie'))

CharJSCoin.minePendingTranscations('charlie')

console.log(CharJSCoin.getBalanceOfAddress('charlie'))
