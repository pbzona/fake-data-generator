const moment = require('moment');
const faker = require('faker');
const states = require('us-state-codes');

// generates a realistic birthday based on user defined variables
const getBirthday = (minAge, maxAge) => {
  const monthAndDay = moment(faker.date.past()).format('MM-DD');
  const year =
    new Date().getFullYear() -
    Math.floor(Math.random() * (maxAge - minAge) + minAge);
  return `${monthAndDay}-${year}`;
};

// generates a detailed birthday and returns it as a deconstructed object
const getBirthdayDetailed = (minAge, maxAge) => {
  const randomDate = moment(faker.date.past());
  const randomMonth = moment(randomDate).format('MMM');
  const randomDay = moment(randomDate).format('D');
  const randomYear =
    new Date().getFullYear() -
    Math.floor(Math.random() * (maxAge - minAge) + minAge);
  return {
    month: randomMonth,
    day: randomDay,
    year: randomYear,
    age: new Date().getFullYear() - randomYear
  };
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
  const stateName = faker.address.state();
  const abbrev = states.getStateCodeByStateName(
    states.sanitizeStateName(stateName)
  );
  return `${faker.address.streetAddress()}, ${faker.address.city()}, ${abbrev} ${faker.address.zipCode()}`;
};

// concat a full name from faker
const getFullName = () => {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
};

// generates a drug name based on latin words of more than 5 characters
const getDrugName = () => {
  const drug = faker.lorem.word();
  return drug.length > 5
    ? `${drug.charAt(0).toUpperCase()}${drug.slice(1)}`
    : getDrugName();
};

// generate dose between 5 and 150mg
const getMedDose = () => {
  return `${Math.floor(Math.random() * 30) * 5 + 5}mg`;
};

//generate a frequency of 1-3x per [week or day]
const getMedFrequency = () => {
  const period = Math.round(Math.random()) ? 'day' : 'week';
  return `${Math.floor(Math.random() * 3) + 1}x per ${period}`;
};

const getTimeframe = prev => {};

const magic = {
  getBirthday,
  getBirthdayDetailed,
  getEmail,
  getLongNumber,
  getFullAddress,
  getFullName,
  getDrugName,
  getMedDose,
  getMedFrequency
};

module.exports = magic;
