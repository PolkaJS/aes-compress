// @flow
import zlib  from 'zlib';
import aesjs from 'aes-js';

export function encrypt(input: string | Object, key: string | Uint8Array, cb: Function) {
  // compress, then encrypt:
  if (!key instanceof Uint8Array)
    key = aesjs.utils.hex.from(input);
  if (typeof input === 'object')
    input = JSON.stringify(input);
  zlib.deflate(Buffer.from(input), (err, compressed) => {
    if (err) cb(err);
    console.log("length of compressed", compressed.length);
    compressed = aesjs.utils.hex.toBytes(compressed.toString('hex'));
    let aesCtr = new aesjs.ModeOfOperation.ctr(key);
    cb(null, aesCtr.encrypt(compressed));
  });
}

export function decrypt(input: string | Uint8Array, key: string | Uint8Array, cb: Function) {
  // decrypt, then decompress:
  if (!input instanceof Uint8Array)
    input = aesjs.utils.hex.toBytes(input);
  let aesCtr = new aesjs.ModeOfOperation.ctr(key);
  let decryptedInput = aesCtr.decrypt(input);
  zlib.inflate(Buffer.from(aesjs.utils.hex.fromBytes(decryptedInput), 'hex'), { asBuffer: false }, (err, original) => {
    cb(null, original.toString());
  });
}
