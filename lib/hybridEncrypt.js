let common = require('./common');
let ec = require('./ec.js');
let P256 = ec.P256;
let aes = require('./aes');
let elgamal = require('./elgamal');

class Ciphertext{
    constructor(){
        this.msgEncrypted = new Uint8Array(0);
        this.symKeyEncrypted = new Uint8Array(0);
    }

    // toBytes converts ciphertext to bytes array
    toBytes(){
        let bytes = new Uint8Array(this.msgEncrypted.length + this.symKeyEncrypted.length);
        bytes.set(this.symKeyEncrypted, 0);
        bytes.set(this.msgEncrypted, this.symKeyEncrypted.length);
        return bytes;
    }
}

function hybridEncrypt(msg, publicKey){
    let ciphertext = new Ciphertext();

    // Generate a AES key as the abscissa of a random elliptic point
    let aesKeyPoint = P256.randomize();
    console.log("AES key point when encrypt: ", aesKeyPoint.compress().join(', '));
    let aesKeyByte = aesKeyPoint.getX().toArray();

    console.log("AES key byte X when encrypt: ", aesKeyByte.join(', '));

    // Encrypt msg using aesKeyByte
    let aesScheme = new aes.AES(aesKeyByte);
    ciphertext.msgEncrypted = aesScheme.Encrypt(msg);

    // Using ElGamal cryptosystem for encrypting AES sym key
    ciphertext.symKeyEncrypted = elgamal.Encrypt(publicKey, aesKeyPoint);

    return ciphertext
}

function TestHybridEncrypt(){
    let msg = [10, 20];
    let privateKey = new common.BigInt(10);
    console.log('Private key : ', privateKey.toArray().join(', '));
    let publicKey = P256.g.mul(privateKey);
    console.log("public key : ", publicKey.compress().join(', '));

    let ciphertext = hybridEncrypt(msg, publicKey.compress());
    console.log("Ciphertext msg when encrypt: ", ciphertext.msgEncrypted.join(', '));

    console.log('ciphertext: ', ciphertext.toBytes().join(', '));
}

// TestHybridEncrypt();

module.exports ={Ciphertext, hybridEncrypt};