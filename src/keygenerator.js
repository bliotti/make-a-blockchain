// Generate a private and public key pair
//! make a new file .env and add priv and pub key

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

// signingKey
const key = ec.genKeyPair()
const publicKey = key.getPublic('hex')
const privateKey = key.getPrivate('hex')

console.log()
console.log('Private: ', privateKey)
console.log()
console.log('PublicKey:  ', publicKey)
