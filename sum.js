// console.log("Hello World");

// function sum (a,b){
//     return a+b
// }
// console.log(sum(4,5));

const sum = (a,b) => a + b;
// console.log(sum(4,5));
// a = sum[2];
// b = sum[3];

// Process.argv
// console.log(process.argv)

// BEFORE DESTRUCTURED
// const  num1 = process.argv[2];
// const  num2 = process.argv[3];

// AFTER DESTUCTURED
const [, , num1, num2] = process.argv;

console.log(sum(+num1 , +num2));

console.log(global);


