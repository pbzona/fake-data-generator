const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const outfile = './customerData.txt';

function getPassportNumber() {
  let passNum = '';
  for (var i = 0; i < 9; i++) {
    passNum += Math.floor(Math.random() * 10);
  }
  return passNum.toString();
}

function getEmail() {
  let username = `${faker.random.word().split(' ').join('').split('-').join('')}${faker.random.number()}`;

  let domain = ''
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

  return `${username}${domain}`;
}

function getBirthday() {
  const monthAndDay = moment(faker.date.past()).format("MM-DD");
  // generate year of birth for age 21-65
  const year = 2018 - Math.floor((Math.random() * 44) + 21);
  return `${monthAndDay}-${year}`;
}

fs.writeFileSync(outfile, 'Id\tFirstName\tLastName\tEmail\tAddress\tDOB\tPassportNumber\n')

let i = 1;
while (i <= 300) {
  let id = i;
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let email = getEmail();
  let address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
  let dob = getBirthday();
  let passNumber = getPassportNumber();

  let data = `${id}\t${firstName}\t${lastName}\t${email}\t${address}\t${dob}\t${passNumber}\n`;

  fs.appendFileSync(outfile, data);
  i++;
}
