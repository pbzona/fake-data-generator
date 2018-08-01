const fs = require('fs');
const path = require('path');

const magic = require('./modules/utilities');

const Mustache = require('mustache');
const pdf = require('html-pdf');

const template = fs
  .readFileSync(path.join(__dirname, 'templates', 'medicalRecord.mustache'))
  .toString();

const generateMedsList = length => {
  let medsList = [];
  for (let i = 0; i < length; i++) {
    medsList.push({
      name: magic.getDrugName(),
      dose: magic.getMedDose(),
      frequency: magic.getMedFrequency(),
      starting: 'xxx',
      ending: 'xxx',
      physician: 'Dr Dolittle',
      purpose: 'because'
    });
  }
  return medsList;
};

const data = {
  patient: {
    id: magic.getLongNumber(8),
    name: magic.getFullName(),
    dob: magic.getBirthday(18, 80),
    address: magic.getFullAddress()
  },
  // Randomize number of rows
  medications: generateMedsList(4)
};
const html = Mustache.render(template, data);

pdf
  .create(html)
  .toFile(path.join(__dirname, 'medicalRecord.pdf'), (err, stream) => {
    console.log('Done!');
  });

// dataSchema = {
//   patient: {
//     id: Number,
//     name: String,
//     dob: Birthday,
//     address: Address
//   },
//   medications: [
//     {
//       name: Drug,
//       dose: Dose,
//       frequency: Custom,
//       starting: MonthYear,
//       ending: MonthYear,
//       physician: Name,
//       purpose: Reason
//     },
//     { max6 }
//   ],
//   surgeries: [
//     {
//       date: Date,
//       procedure: Custom,
//       Physician: Name,
//       Hospital: Custom,
//       Notes: Notes
//     },
//     { max5 }
//   ],
//   illnesses: [
//     {
//       type: Illness,
//       start: MonthYear,
//       end: MonthYear,
//       hospital: Hospital,
//       notes: Notes
//     }
//   ],
//   vaccinations: {
//     tetanus: Date,
//     meningitis: Date,
//     influenza: Date,
//     yellowFever: Date,
//     zostavax: Date,
//     polio: Date,
//     other1: Date,
//     other2: Date
//   }
// };
