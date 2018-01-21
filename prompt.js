// var readline = require('readline');

// var rl = readline.createInterface({
//     input: process.stdin, 
//     output: process.stdout
// });

// rl.question("What is 2+2?  ", function(answer){
//     if (answer === "4"){
//         console.log("correct!")
//     } else {
//         console.log("nope")
//     }
// })


var rl = require('readline-sync');
 
// Wait for user's response. 
var userName = rl.question('May I have your name? ');
console.log('Hi ' + userName + '!');
 
// Handle the secret text (e.g. password). 
var favFood = rl.question('What is your favorite food? ', {
  hideEchoBack: true // The typed text on screen is hidden by `*` (default). 
});
console.log('Oh, ' + userName + ' loves ' + favFood + '!');