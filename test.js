const aesc = require('./lib/aes-compress');

const key_256 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
               16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
               29, 30, 31];

aesc.encrypt(x.toString('hex'), key_256, (err, enc) => {
  if (err) console.log("err", err);
  // console.log("enc", enc);
  aesc.decrypt(enc, key_256, (err, dec) => {
    if (err) console.log("err", err);
    // console.log("dec", dec);
  })
});



// const zlib = require('zlib')
//
// let x = new Buffer(1000000);
// for (let y = 0; y < x.length; y++) {
//   x[y] = Math.random() * (127 - 0) + 0;
// }
// console.log("x.length", x.length);
// console.log("x", x);
// zlib.deflate(x, (err, buf) => {
//   console.log("err", err);
//   console.log("buf.length", buf.length);
//   console.log(buf.length/x.length)
// });
