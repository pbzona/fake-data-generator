const fs = require('fs');
const path = require('path');

const magic = require('./modules/utilities');
const Record = require('./modules/models');

const shortid = require('shortid');
const moment = require('moment');
const faker = require('faker');
const Mustache = require('mustache');
const pdf = require('html-pdf');

const template = fs
  .readFileSync(path.join(__dirname, 'templates', 'medicalRecord.mustache'))
  .toString();

const pdfOptions = {
  orientation: 'Landscape'
};

const generateTable = () => {};

const generateInventoryList = length => {
  const dateList = magic.generateSequentialDates(length);

  let inventoryList = [];
  for (let i = 0; i < length; i++) {
    inventoryList.push(
      new Record.DrugInventory({
        date: dateList[i],
        patientName: magic.getFullName(),
        mrn: magic.getLongNumber(7),
        quantity: magic.getDrugQuantity(),
        lotNumber: shortid.generate().toUpperCase(),
        expiration: moment(magic.randomDateInNextXYears(6)).format('M/D/YYYY'),
        patientEducated: 'YES',
        physician: `Dr. ${faker.name.lastName()}`
      })
    );
  }

  return inventoryList;
};

const data = {
  drug: {
    name: magic.getDrugName(),
    clinic: magic.getHospital(),
    units: magic.getDrugUnits()
  }
};

console.log(generateInventoryList(5));
