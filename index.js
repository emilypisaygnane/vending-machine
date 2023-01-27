const process = require('process');
const { parseArgs } = require('./parse-args.js');

// console.log('argv', process.argv);

const { itemCost, payment } = parseArgs(process.argv);

const vendingMachine = (itemCost, payment) => {

  // remove decimals from item and money for easier calculation
  let change = payment * 100 - itemCost * 100;

  // create object to hold coin amounts
  let coins = { quarters: 0, dimes: 0, nickels: 0, pennies: 0 };

  // check for valid input
  if (isNaN(itemCost)) {
    console.log('--item-cost must be a number');
    process.exit(1);
  }

  if (itemCost == null) {
    console.error('--item-cost must be entered');
    process.exit(1);
  }

  if (isNaN(payment)) {
    console.log('--payment must be a number');
    process.exit(1);
  }

  if (payment == null) {
    console.error('--payment must be entered');
    process.exit(1);
  }

  // check if payment is sufficient
  if (itemCost > payment) {
    console.log('--payment amount is insufficient for item');
    process.exit(1);
  }
  
  // total the amount of change due
  console.log('');
  console.log('Total change dispensed: ');
  console.log(` --${change.toString()} cents`);
  console.log('');
  console.log('Denominations: ');

  while (change > 0) {

    change >= 25
      ? (coins.quarters++,
        (change -= 25))
      : 
      change >= 10 && change < 25
      ? (coins.dimes++, (change -= 10) 
      )
      : 
      change >= 5 && change < 10
      ? (coins.nickels++,
        (change -= 5)
        )
      : 
      change >= 1 && change < 5
      ? (coins.pennies++,
        (change -= 1)
        )
      : null;
  }

  // returns the amount of each coin dispensed
  console.log(` --Quarters: ${coins.quarters.toString()}`);
  console.log(` --Dimes: ${coins.dimes.toString()}`);
  console.log(` --Nickels: ${coins.nickels.toString()}`);
  console.log(` --Pennies: ${coins.pennies.toString()}`);
  return ''; 
};
console.log(vendingMachine(itemCost, payment));