const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

// defines the output file for the generated user data
const outfile = './customerData.txt';

// generates a random 9 digit number, such as in a passport
function getPassportNumber() {
  // initializes a string
  let passNum = '';

  // appends digits til it reaches 9 - TODO: abstract this to generate random number of n length
  for (var i = 0; i < 9; i++) {
    passNum += Math.floor(Math.random() * 10);
  }

  // returns a string - the generated 9 digit number
  return passNum.toString();
}

// generates a pseudo random email address
function getEmail() {
  // this generates a random word (or set of words) followed by a random number - better than faker's username method
  let username = `${faker.random.word().split(' ').join('').split('-').join('')}${faker.random.number()}`;

  // generates a more realistic domain for the user's email address
  let domain = '';
  let numTwo = Math.floor(Math.random() * 4);
  switch (numTwo) {
    case 0:
      domain = '@gmail.com';
      break;
    case 1:
      domain = '@yahoo.com';
      break;
    case 2:
      domain = '@outlook.com';
      break;
    case 3:
      domain = '@hotmail.com'
  }

  // returns a string - username generated above plus the "random" email domain
  return `${username}${domain}`;
}

// generates a realistic birthday based on user defined variables
function getBirthday() {
  // generates a random day and month
  const monthAndDay = moment(faker.date.past()).format("MM-DD");

  // change these values if you like - TODO: abstract these to function arguments
  const minAge = 21;
  const maxAge = 65;

  // generates a "realistic" year of birth based on age range set above
  const year = 2018 - Math.floor((Math.random() * (maxAge - minAge)) + minAge);
  return `${monthAndDay}-${year}`;
}

// defines the column headings for the TSV table
const cols = 'Id\tFirstName\tLastName\tEmail\tAddress\tDOB\tPassportNumber\n';

// writes the column headings - because it uses writeFile and not appendFile, this will reinitialize the generated data each time you run the script, no need to clear the output file
fs.writeFileSync(outfile, cols)

// initialize the iterator var (i) and define the number of rows to write
let i = 1;
const = lengthOfData = 300;

// add all the fake data to the table
while (i <= lengthOfData) {
  // here we actually generate the data
  let id = i;
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let email = getEmail();
  // generating the address inline - TODO: abstract out
  let address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
  let dob = getBirthday();
  let passNumber = getPassportNumber();

  // format the data to match the TSV format
  let data = `${id}\t${firstName}\t${lastName}\t${email}\t${address}\t${dob}\t${passNumber}\n`;

  // write it to the end of the existing output file
  fs.appendFileSync(outfile, data);
  i++;
}
