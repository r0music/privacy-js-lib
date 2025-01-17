let P256 = require('../lib/ec').P256;
let bn = require('bn.js');
const Utility = require('../lib/privacy_utils').Utility;


function Test123() {
  let a = BigInt("2783456789034567894567895678905678");
  let aBN = new bn("2783456789034567894567895678905678");

  let sp = BigInt(20);
  let spBN = new bn(20);

  /*console.time("Method 1: ");
  let result1 = P256.g.derive(spBN, aBN);
  console.log("Result1: ", result1);
  console.timeEnd("Method 1: ");

  console.time("Method 2: ");
  let result2 = P256.g.deriveOptimized(sp, a);
  console.log("Result1: ", result2);
  console.timeEnd("Method 2: ");*/


  // console.time("Mul 1: ");
  // let result1 = P256.g.mul(aBN);
  // console.log("Result1: ", result1);
  // console.timeEnd("Mul 1: ");

  // console.time("Mul 2: ");
  // let result2 = P256.g.mulOptimized(a);
  // console.log("Result2: ", result2);
  // console.timeEnd("Mul 2: ");

  const g = P256.g
  const h = g.hash(0)

  console.time("Add addOptimized")
  const temp2 = g.addOptimized(h)
  console.timeEnd("Add addOptimized")
  console.log(temp2)

  console.time("Add bn.js")
  const temp1 = g.add(h)
  console.timeEnd("Add bn.js")
  console.log(temp1)
}

// Test123()

// function Test1234(){
//   const g = P256.g
//   let h = g.hash(100);
//   console.log("Res: ", h.compress().join(" "));

//   h = g.hash(1000);
//   console.log("Res: ", h.compress().join(" "));

//   h = g.hash(10000);
//   console.log("Res: ", h.compress().join(" "));

//   h = g.hash(100000);
//   console.log("Res: ", h.compress().join(" "));

//   h = g.hash(1000000);
//   console.log("Res: ", h.compress().join(" "));
// }

// Test1234()


// let point = P256.g.hash(10000);
// console.log("TEst hash: ", point);

let u = Utility();

u.set(()=> {console.log("A")});

console.log("Utility: ", u.get());