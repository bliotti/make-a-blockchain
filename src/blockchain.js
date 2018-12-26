const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('fd')
    }

    const hashTx = this.calculateHash()
    const sig = signingKey.sign(hashTx, 'base64')
    this.signature = sig.toDER('hex')
  }

  isValid() {
    if (this.fromAddress === null) return true

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No Sig')
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
    return publicKey.verify(this.calculateHash(), this.signature)
  }
}

class Block {
  constructor(timestamp, transactions, previousHash) {
    this.timestamp = timestamp
    this.transactions = transactions
    this.previousHash = previousHash
    this.nonce = 0
    this.hash = this.calculateHash()
  }

  calculateHash() {
    this.nonce //?
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
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

  hasValidTransaction() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false
      }
    }
    return true
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 1
    this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block('01/01/2017', 'Genesis Block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // ! miners chose transactioms
  minePendingTranscations(miningRewardAddress) {
    const rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    )
    this.pendingTransactions.push(rewardTx)

    let block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    ) //?
    block.mineBlock(this.difficulty)

    console.log('Block Mined!')
    this.chain.push(block)

    // Could add more coins but P2P checks will not allow
    this.pendingTransactions = []
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('must have addreses')
    }

    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid trans to chain')
    }
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

      if (!currentBlock.hasValidTransaction()) {
        return false
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }
      currentBlock.previousHash //?
      previousBlock.calculateHash() //?
      previousBlock.hash //?
      if (currentBlock.previousHash !== previousBlock.calculateHash()) {
        return 3
      }
    }
    return true
  }
}

module.exports.Blockchain = Blockchain

module.exports.Transaction = Transaction

// const { Blockchain, Transaction } = require('./blockchain')
// const EC = require('elliptic').ec
// const ec = new EC('secp256k1')
require('dotenv').config()

const myKey = ec.keyFromPrivate(process.env.Private) //?
const myWalletAddress = myKey.getPublic('hex')

const CharJSCoin = new Blockchain()

const tx1 = new Transaction(myWalletAddress, 'pub', 10)
tx1.signTransaction(myKey)
CharJSCoin.addTransaction(tx1)

CharJSCoin.minePendingTranscations(myWalletAddress)

console.log(CharJSCoin.getBalanceOfAddress(myWalletAddress))

CharJSCoin.chain[1].transactions[0].amount = 1

console.log(CharJSCoin.isChainValid())
