const moment = require('moment');
const faker = require('faker');
const states = require('us-state-codes');

const randomData = require('./seed');

// LOCAL FUNCTIONS

const getRandomItemFromList = list => {
  return list[Math.floor(Math.random() * list.length)];
};

const shortRandom = range => {
  return Math.floor(Math.random() * range[1]) + range[0];
};

// EXPORTS

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
  const randomTime = moment()
    .year(randomYear)
    .month(randomMonth)
    .date(randomDay);

  return {
    month: randomMonth,
    day: randomDay,
    year: randomYear,
    age: new Date().getFullYear() - randomYear,
    moment: randomTime,
    dob: moment(randomTime).format('MM-DD-YYYY')
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

const getSequentialTimeframe = (init, timeRemoved, range) => {
  // init - year to start at (relative to birth)
  // timeRemoved - min number of months to add to init for start date (optional)
  // range - time in months to use when generating end date

  // sets the difference between 'init' and the start date
  const randomizeStartTime = Math.ceil(Math.random() * 18) + timeRemoved;

  // generate a timeframe in format Month Year
  // Be careful here - need to manually account for person's age so this doesn't overlap into current time
  const start = moment(init).add(randomizeStartTime, 'months');
  const startMonthYear = start.format('MMM YYYY');

  // should generate a second timeframe, some random amount of time after the first
  const randomizeEndTime = startDate => {
    const endDate = moment(startDate).add(
      Math.floor(Math.random() * (range || 18)) + 1,
      'months'
    );
    if (moment(endDate).isAfter(moment())) {
      return randomizeEndTime(startDate);
    }
    return endDate;
  };

  const endMonthYear = randomizeEndTime(start).format('MMM YYYY');

  // should return an object with first and second timeframes
  return {
    start: startMonthYear,
    end: endMonthYear
  };
};

// generates a random timeframe (Month-Year) during the past X years
// can be joined with getSequentialTimeFrame to generate an initial value
const randomTimeInLastXPlusYears = (X, minimum) => {
  // adds a removal value to the present to avoid overlaps with now
  const years = Math.floor(Math.random() * X) + (minimum || 1);
  const months = Math.ceil(Math.random() * 12);

  // returns a moment object
  return moment()
    .subtract(years, 'years')
    .subtract(months, 'months');
};

// generates a random date during the past X years
const randomDayInLastXPlusYears = (X, minimum) => {
  // adds a removal value to the present to avoid overlaps with now
  const years = Math.floor(Math.random() * X) + (minimum || 1);
  const months = Math.ceil(Math.random() * 12);
  const days = Math.ceil(Math.random() * 30);

  // returns a moment object
  return moment()
    .subtract(years, 'years')
    .subtract(months, 'months')
    .subtract(days, 'days');
};

// generate a random reason for being prescribed a particular medication
const getAilment = () => {
  return getRandomItemFromList(randomData.ailments);
};

// generate a random surgical procedure
const getSurgicalProcedure = () => {
  return getRandomItemFromList(randomData.surgicalProcedures);
};

// generate a random hospital name
const getHospital = () => {
  return `${getRandomItemFromList(
    randomData.hospitalPrefix
  )} ${getRandomItemFromList(randomData.hospitalSuffix)}`;
};

// generate random surgical notes
const getSurgicalNotes = () => {
  return getRandomItemFromList(randomData.surgicalNotes);
};

// generates a random illness/condition
const getIllness = () => {
  return getRandomItemFromList(randomData.illnesses);
};

// generates random doctor's notes from a past illness (can be empty)
const getIllnessNotes = () => {
  return getRandomItemFromList(randomData.illnessNotes);
};

// generate a year in the first n years of a person's life
const randomTimeInFirstXYears = (X, yearOfBirth) => {
  const randomYears = Math.ceil(Math.random() * X);
  return yearOfBirth + randomYears;
};

// generate a list of sequential dates from a random starting point
const generateSequentialDates = length => {
  let dateList = [];

  let current = magic.randomDayInLastXPlusYears(5);
  for (let i = 0; i < length; i++) {
    dateList.push(current.format('M/D/YYYY'));
    const daysToAdd = Math.floor(Math.random() * 3);
    current = current.add(daysToAdd, 'days');
  }

  return dateList;
};

// get random drug quantity
const getDrugQuantity = () => {
  return shortRandom([1, 5]);
};

// get random drug "units" for inventory sheet
const getDrugUnits = () => {
  return getRandomItemFromList(randomData.drugUnits);
};

// generates a date sometime in the next X years
const randomDateInNextXYears = X => {
  const yearsToAdd = shortRandom([1, X]);
  const monthsToAdd = shortRandom([1, 11]);
  const daysToAdd = shortRandom([1, 30]);

  return moment()
    .add(yearsToAdd, 'years')
    .add(monthsToAdd, 'months')
    .add(daysToAdd, 'days');
};

// concat a name in format (last name, first name) from faker
const getFullReversedName = () => {
  return `${faker.name.lastName()}, ${faker.name.firstName()}`;
};

const magic = {
  getBirthday,
  getBirthdayDetailed,
  getEmail,
  getLongNumber,
  getFullAddress,
  getFullName,
  getDrugName,
  getMedDose,
  getMedFrequency,
  getSequentialTimeframe,
  randomTimeInLastXPlusYears,
  randomDayInLastXPlusYears,
  getAilment,
  getSurgicalProcedure,
  getHospital,
  getSurgicalNotes,
  getIllness,
  getIllnessNotes,
  randomTimeInFirstXYears,
  generateSequentialDates,
  getDrugQuantity,
  getDrugUnits,
  randomDateInNextXYears,
  getFullReversedName
};

module.exports = magic;
