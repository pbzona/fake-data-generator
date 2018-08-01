const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const magic = require('./modules/utilities');

// defines the output file for the generated user data
const outfile = './customerData.txt';

// defines the column headings for the TSV table
const cols = 'Id\tFirstName\tLastName\tEmail\tAddress\tDOB\tPassportNumber\n';

// writes the column headings - because it uses writeFile and not appendFile, this will reinitialize the generated data each time you run the script, no need to clear the output file
fs.writeFileSync(outfile, cols);

// initialize the iterator var (i) and define the number of rows to write
let i = 1;
const lengthOfData = 300;

// add all the fake data to the table
while (i <= lengthOfData) {
  let id = i;
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let email = magic.getEmail();
  let address = magic.getFullAddress();
  let dob = magic.getBirthday(21, 65);
  let passNumber = magic.getLongNumber(9);

  // format the data to match the TSV format
  let data = `${id}\t${firstName}\t${lastName}\t${email}\t${address}\t${dob}\t${passNumber}\n`;

  // write it to the end of the existing output file
  fs.appendFileSync(outfile, data);
  i++;
}
