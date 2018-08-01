const faker = require('faker');
const states = require('us-state-codes');

const magic = require('./modules/utilities');

const getSequentialTimeframe = (prev, limit) => {
  // should generate a timeframe in format Month Year
  // should generate a second timeframe, some random amount of time after the first
  // should limit both timeframes to not happen before the limit (i.e. birthday year of person)
  // should return an object with first and second timeframes
};

console.log(magic.getBirthdayDetailed(18, 80));
