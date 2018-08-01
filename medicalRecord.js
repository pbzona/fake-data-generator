const fs = require('fs');
const path = require('path');

const magic = require('./modules/utilities');

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

const historyLength = magic.randomTimeInLastXPlusYears(14, 2);

const generateMedsList = length => {
  let medsList = [];
  for (let i = 0; i < length; i++) {
    const timeFrame = magic.getSequentialTimeframe(
      historyLength,
      Math.floor(Math.random() * 4),
      18
    );
    medsList.push({
      name: magic.getDrugName(),
      dose: magic.getMedDose(),
      frequency: magic.getMedFrequency(),
      starting: timeFrame.start,
      ending: timeFrame.end,
      physician: `Dr. ${faker.name.lastName()}`,
      purpose: magic.getAilment()
    });
  }
  return medsList;
};

const generateSurgeryList = length => {
  let surgeryList = [];
  for (let i = 0; i < length; i++) {
    surgeryList.push({
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
    });
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
    illnessList.push({
      type: magic.getIllness(),
      start: timeFrame.start,
      end: timeFrame.end,
      hospital: magic.getHospital(),
      notes: magic.getIllnessNotes()
    });
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
    id: magic.getLongNumber(8),
    name: magic.getFullName(),
    dob: patientBirthday.dob,
    address: magic.getFullAddress()
  },
  // Randomize number of rows
  medications: generateMedsList(Math.floor(Math.random() * 4) + 2),
  surgeries: generateSurgeryList(Math.floor(Math.random()) + 1),
  illnesses: generateIllnessList(Math.floor(Math.random() * 2) + 1),
  vaccinations: generateVaccinationList(7)
};
const html = Mustache.render(template, data);

pdf
  .create(html)
  .toFile(path.join(__dirname, 'medicalRecord.pdf'), (err, stream) => {
    console.log('Done!');
  });
