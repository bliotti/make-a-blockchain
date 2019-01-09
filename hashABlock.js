const SHA256 = require('crypto-js/sha256')
var hexy = require('hexy')

const buf1 = Buffer.from('buffer')
const buf2 = Buffer.from(buf1)

buf1[0] = 0x61
JSON.stringify(buf1) //?
JSON.stringify(buf2) //?

console.log(buf1.toString())
// Prints: auffer
console.log(buf2.toString())
// Prints: buffer

const buf3 = Buffer.from('this is a tést')
const buf4 = Buffer.from('7468697320697320612074c3a97374', 'hex')

console.log(buf3.toString())
// Prints: this is a tést
console.log(buf4.toString())
// Prints: this is a tést
console.log(buf3.toString('ascii'))
// Prints: this is a tC)st

const A = Date.now() //?
typeof A //?
A / 1000 / 60 / 60 / 24 / 365.25 + 1970 //?
const B = parseInt(A, 16) //?
typeof B //?
const C = Date(A) //?
const D = C.toString() //?

Date(parseInt(Date.now(), 16)).toString() //?

Date(A) //?
Date(B) //?

parseInt('F41E3717', 16) //?

const blk3hex =
  '01000000bddd99ccfda39da1b108ce1a5d70038d0a967bacb68b6b63065f626a0000000044f672226090d85db9a9f2fbfe5f0f9609b387af7be5b7fbb7a1767c831c9e995dbe6649ffff001d05e0ed6d0101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d010effffffff0100f2052a0100000043410494b9d3e76c5b1629ecf97fff95d7a4bbdac87cc26099ada28066c6ff1eb9191223cd897194a08d0c2726c5747f1db49e8cf90e75dc3e3550ae9b30086f3cd5aaac00000000'
blk3hex //?
const blk3hex160 = blk3hex.substring(0, 160) //?
typeof blk3hex160 //?
const buffstr = new Buffer(blk3hex160.toString('hex'), 'hex') //?
const blk3hex1602 = SHA256(buffstr).toString() //?
const buffstr2 = new Buffer(blk3hex1602.toString('hex'), 'hex') //?
const blk3hex1603 = SHA256(buffstr2).toString() //?

function hex2bin(hex) {
  return '00000000' + parseInt(hex, 16).toString(2)
}

hex2bin(blk3hex160) //?

// https://medium.com/coinmonks/how-to-manually-verify-the-merkle-root-of-a-bitcoin-block-command-line-7881397d4db1
// https://medium.com/@jordan.baczuk/how-to-manually-verify-the-hash-of-a-bitcoin-block-command-line-80c71d4c50f2

// https://blockchain.info/block/0000000082b5015589a3fdf2d4baff403e6f0be035a5d9742c1cae6295464449?format=json
// https://blockchain.info/block/0000000082b5015589a3fdf2d4baff403e6f0be035a5d9742c1cae6295464449?format=hex

// http://yogh.io/#mine:last
