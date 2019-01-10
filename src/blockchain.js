const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

// There is still a problem, anyone could make
// transactions and spend coins that are not yours
// The solution for proof of ownership is to req. transactions to be
// signed by a private key (digital signature)
// This way one can only spend coins from an address if they have the private key

// We need to sign these transactions
// add need a method that can verify the signature

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }

  // ADD a calculateHash method to generate the hash of a transaction.
  // instead of signing the trans. we will signing the hash of it.

  // calculateHash() {
  //   return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
  // }

  // ADD a method called signTransaction
  // signingKey arguement is a obj. that contains the private and public key

  // signTransaction(signingKey) {
  //   // before we sign below, check if the public key == fromAddress

  //   if (signingKey.getPublic('hex') !== this.fromAddress) {
  //     throw new Error('cannot sign transactions for other wallets')
  //   }

  //   // create the hash of a transaction
  //   const hashTx = this.calculateHash()
  //   // create a signature from the hash in base64 format
  //   const sig = signingKey.sign(hashTx, 'base64')
  //   // store the the signature in the trans. derEnconding (just a special format) in hex form
  //   this.signature = sig.toDER('hex')
  // }

  // Lets ADD another method to verify if the trans. has been correctly signined

  // isValid() {
  //   // Mining reward case: since fromAddress is null from a mining reward trans return true
  //   if (this.fromAddress === null) return true

  //   // If the from address is NOT null we need to do additional checks.
  //   // check if a signature is present
  //   if (!this.signature || this.signature.length === 0) {
  //     throw new Error('No Signature in the transaction')
  //   }

  //   // at this point we now need to verify if the trans was signed with the correct key
  //   // make a new public key object from the from address since the from address is a pub. key
  //   const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
  //   // returns boolean if signature matches with hash and publicKey
  //   return publicKey.verify(this.calculateHash(), this.signature)
  // }
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
    this.nonce
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
      this.nonce++
      this.hash = this.calculateHash()
    }

    console.log('Block successfully mined!', this.hash)
  }

  // ADD method hasValidTransaction to verify all trans. in current block

  // hasValidTransaction() {
  //   // method loops over all trans. to check signature
  //   for (const tx of this.transactions) {
  //     if (!tx.isValid()) {
  //       return false
  //     }
  //   }
  //   return true
  // }
}

// modify isChainValid Method

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 4
    this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block('01/01/2017', 'Genesis Block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

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
    )
    block.mineBlock(this.difficulty)

    this.chain.push(block)

    this.pendingTransactions = []
  }

  //.... changed method to addTransaction from createTransaction

  // addTransaction(transaction) {
  //   if (!transaction.fromAddress || !transaction.toAddress) {
  //     throw new Error('Transaction must include a from and to address')
  //   }

  //   if (!transaction.isValid()) {
  //     throw new Error('Cannot add invalid transaction to chain')
  //   }
  //   this.pendingTransactions.push(transaction)
  // }

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

    return balance
  }

  // this method currently verifies hashes are correct and that each block links to the prev. block

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      // lets ADD a check to verify if all the trans. in the currentBlock are valid

      // if (!currentBlock.hasValidTransaction()) {
      //   return false
      // }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      previousBlock.calculateHash()

      if (currentBlock.previousHash !== previousBlock.calculateHash()) {
        return false
      }
    }
    return true
  }
}

module.exports.Blockchain = Blockchain
module.exports.Transaction = Transaction
