const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
require('dotenv').config()

const myKey = ec.keyFromPrivate(process.env.Private)
const myWalletAddress = myKey.getPublic('hex')

const CharJSCoin = new Blockchain()

const tx1 = new Transaction(myWalletAddress, 'pub', 10)
tx1.signTransaction(myKey)
CharJSCoin.addTransaction(tx1)

CharJSCoin.minePendingTranscations(myWalletAddress)

console.log('Balance: ', CharJSCoin.getBalanceOfAddress(myWalletAddress))

console.log('Is the chain valid? ', CharJSCoin.isChainValid())
