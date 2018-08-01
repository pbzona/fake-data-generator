const moment = require('moment');
const faker = require('faker');

// generates a realistic birthday based on user defined variables
const getBirthday = (minAge, maxAge) => {
  const monthAndDay = moment(faker.date.past()).format('MM-DD');
  const year =
    new Date().getFullYear() -
    Math.floor(Math.random() * (maxAge - minAge) + minAge);
  return `${monthAndDay}-${year}`;
};

// generates a pseudo random email address
const getEmail = () => {
  let username = `${faker.random
    .word()
    .split(' ')
    .join('')
    .split('-')
    .join('')}${faker.random.number()}`;

  let domains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com'];

  return `${username}${domains[Math.floor(Math.random() * domains.length)]}`;
};

// generates a random number of arbitrary length, such as in a passport
const getLongNumber = digits => {
  let passNum = '';
  for (var i = 0; i < digits; i++) {
    passNum += Math.floor(Math.random() * 10);
  }
  return passNum.toString();
};

// generates a full address string - faker can only reliably do parts at a time
const getFullAddress = () => {
  return `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
};

const magic = {
  getBirthday,
  getEmail,
  getLongNumber,
  getFullAddress
};

module.exports = magic;
