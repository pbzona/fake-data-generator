const fs = require('fs');
const path = require('path');

const magic = require('./modules/utilities');
const Record = require('./modules/models');

const moment = require('moment');
const faker = require('faker');
const Mustache = require('mustache');
const pdf = require('html-pdf');

const template = fs
  .readFileSync(path.join(__dirname, 'templates', 'medicalRecord.mustache'))
  .toString();

const patientBirthday = magic.getBirthdayDetailed(18, 80);
const patientAge = patientBirthday.age;
const patientYearOfBirth = patientBirthday.year;

const patientName = magic.getFullName();
const patientId = magic.getLongNumber(7);

const historyLength = magic.randomTimeInLastXPlusYears(14, 2);

const generateTable = (dataRowFunction, totalRowCount, Model) => {
  const dataRowCount = Math.floor(Math.random() * totalRowCount) + 2;
  const emptyRowCount = totalRowCount - dataRowCount;

  const emptyRowFunction = () => {
    let emptyRows = [];
    for (let i = 0; i < emptyRowCount; i++) {
      emptyRows.push(new Model({}));
    }
    return emptyRows;
  };

  return dataRowFunction.apply(null, [dataRowCount]).concat(emptyRowFunction());
};

const generateMedsList = length => {
  let medsList = [];
  for (let i = 0; i < length; i++) {
    const timeFrame = magic.getSequentialTimeframe(
      historyLength,
      Math.floor(Math.random() * 4),
      18
    );
    medsList.push(
      new Record.Medication({
        name: magic.getDrugName(),
        dose: magic.getMedDose(),
        frequency: magic.getMedFrequency(),
        starting: timeFrame.start,
        ending: timeFrame.end,
        physician: `Dr. ${faker.name.lastName()}`,
        purpose: magic.getAilment()
      })
    );
  }
  return medsList;
};

const generateSurgeryList = length => {
  let surgeryList = [];
  for (let i = 0; i < length; i++) {
    surgeryList.push(
      new Record.Surgery({
        date: magic
          .randomDayInLastXPlusYears(
            Math.floor(Math.random() * (patientAge / 3)),
            1
          )
          .format('MM-DD-YYYY'),
        procedure: magic.getSurgicalProcedure(),
        physician: `Dr. ${faker.name.lastName()}`,
        hospital: magic.getHospital(),
        notes: magic.getSurgicalNotes()
      })
    );
  }

  return surgeryList;
};

const generateIllnessList = length => {
  let illnessList = [];
  for (let i = 0; i < length; i++) {
    const timeFrame = magic.getSequentialTimeframe(
      historyLength,
      Math.floor(Math.random() * 4),
      6
    );
    illnessList.push(
      new Record.Illness({
        illness: magic.getIllness(),
        start: timeFrame.start,
        end: timeFrame.end,
        hospital: magic.getHospital(),
        notes: magic.getIllnessNotes()
      })
    );
  }

  return illnessList;
};

const generateVaccinationList = maxAge => {
  const oldestVaccinationAge = maxAge;
  const humanErrorWhenRememeberingDates = () => {
    return Math.round(Math.random())
      ? magic.randomTimeInFirstXYears(oldestVaccinationAge, patientYearOfBirth)
      : moment()
          .year(
            magic.randomTimeInFirstXYears(
              oldestVaccinationAge,
              patientYearOfBirth
            )
          )
          .format('MMM YYYY');
  };

  return {
    tetanus: humanErrorWhenRememeberingDates,
    meningitis: humanErrorWhenRememeberingDates,
    influenza: humanErrorWhenRememeberingDates,
    yellowFever: humanErrorWhenRememeberingDates,
    zostavax: humanErrorWhenRememeberingDates,
    polio: humanErrorWhenRememeberingDates
  };
};

const data = {
  patient: {
    id: patientId,
    name: patientName,
    dob: patientBirthday.dob,
    address: magic.getFullAddress()
  },
  // Randomize number of rows
  medications: generateTable(generateMedsList, 5, Record.Medication),
  surgeries: generateTable(generateSurgeryList, 4, Record.Surgery),
  illnesses: generateTable(generateIllnessList, 4, Record.Illness),
  vaccinations: generateVaccinationList(7)
};
const html = Mustache.render(template, data);

const outputFile = `${patientName
  .split(' ')
  .join('_')
  .toLowerCase()}_${patientId}.pdf`;

pdf.create(html).toFile(path.join(__dirname, outputFile), (err, stream) => {
  console.log('Done!');
});
