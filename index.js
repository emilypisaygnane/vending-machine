const process = require('process');

// console.log(process.argv)
let arg = null
let cost = null
let payment = null

// provides cost and payment
while((arg = process.argv.shift()) != null) {
  if(arg === '--item-cost') {
    const costInput = process.argv.shift()
    cost = Math.floor(Number(costInput || '0') * 100)
  } else if (arg === '--payment') {
    const paymentInput = process.argv.shift()
    payment = Math.floor(Number(paymentInput || '0') * 100)
  }
}

console.error('--item-cost', cost)
console.error('--payment', payment)

if (payment !== null && cost !== null) {
  let quarter = 0;
  let dime = 0;
  let nickel = 0;
  let penny = 0;

  let change = Math.floor(Number(payment - cost));
  
  while (change >= 25) {
    change -= 25;
    quarter++;
  }

  while (change >= 10) {
    change -= 10;
    dime++;
  }

  while (change >= 5) {
    change -= 5;
    nickel++;
  }

  while (change >= 1) {
    change -= 1;
    penny++;
  }

  console.log (`
    ${quarter} quarters, 
    ${dime} dimes, 
    ${nickel} nickels, 
    ${penny} pennies
    `)
}

// prints total change
console.log(`Total Change: ${Math.floor((payment - cost) / 100)}`)


// narrow cost to a number
if (cost == null) {
  console.error('--item-cost is required but not provided. Exiting.')
  process.exit(1)
}

if (payment == null) {
  console.error('--payment is required but not provided. Exiting.')
  process.exit(2)
}