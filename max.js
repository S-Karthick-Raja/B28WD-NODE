// const arr = process.argv;
// for (i = 0; i < arr.length; i++) {
//     max = (process.argv[i]);
// }
// console.log(Math.max(...max));


const [, , nums] = process.argv;
console.log("Input string", nums);
const arr = JSON.parse(nums);
console.log("converted to array:", arr);
console.log("Max number is:", Math.max(...arr));