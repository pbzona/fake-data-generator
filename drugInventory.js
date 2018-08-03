const fs = require('fs');
const path = require('path');

const magic = require('./modules/utilities');
const Record = require('./modules/models');

const shortid = require('shortid');
const moment = require('moment');
const faker = require('faker');
const Mustache = require('mustache');
const pdf = require('html-pdf');

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

const generateInventoryList = length => {
  const dateList = magic.generateSequentialDates(length);

  let inventoryList = [];
  for (let i = 0; i < length; i++) {
    inventoryList.push(
      new Record.DrugInventory({
        date: dateList[i],
        patientName: magic.getFullReversedName(),
        mrn: magic.getLongNumber(7),
        quantity: magic.getDrugQuantity(),
        lotNumber: shortid
          .generate()
          .toUpperCase()
          .split('_')
          .join('')
          .split('-')
          .join(''),
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
    units: `${magic.getDrugUnits()} (${magic.getMedDose()})`
  },
  inventoryRows: generateTable(generateInventoryList, 20, Record.DrugInventory)
};

const template = fs
  .readFileSync(path.join(__dirname, 'templates', 'drugInventory.mustache'))
  .toString();

const html = Mustache.render(template, data);

const pdfOptions = {
  orientation: 'Landscape'
};

pdf
  .create(html, pdfOptions)
  .toFile(path.join(__dirname, 'drugInventory.pdf'), (err, stream) => {
    console.log('Done!');
  });
