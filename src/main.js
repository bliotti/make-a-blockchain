require('dotenv').config()
const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

// // initialize key
// const myKey = ec.keyFromPrivate(process.env.Private)

// // extract public key in hex format from private
// const myWalletAddress = myKey.getPublic('hex')

// // start a new instance of Blockchain
// const CharJSCoin = new Blockchain()

// // from our address to someone else's address
// const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10)
// tx1.signTransaction(myKey)

// // Add the transaction to the chain
// CharJSCoin.addTransaction(tx1)

// // send the mining reward to our address!
// console.log('\n Starting the miner...')

// CharJSCoin.minePendingTranscations(myWalletAddress)

// // check our balance
// console.log('Balance: ', CharJSCoin.getBalanceOfAddress(myWalletAddress))

// // Now let Tamper with the blockchain!

// // First lets check if the chain is valid?
// console.log('Is chain valid? ', CharJSCoin.isChainValid())

// // tamper with the ledger by taking the second block on the chain [1], take the first transaction and
// // change the amount sent from 10 to 1
// CharJSCoin.chain[1].transactions[0].amount = 1

// console.log('Is chain valid? ', CharJSCoin.isChainValid())
