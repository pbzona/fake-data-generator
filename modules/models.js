class Medication {
  constructor(medication) {
    this.name = medication.name || '.';
    this.dose = medication.dose || ' ';
    this.frequency = medication.frequency || ' ';
    this.starting = medication.starting || ' ';
    this.ending = medication.ending || ' ';
    this.physician = medication.physician || ' ';
    this.purpose = medication.purpose || ' ';
  }
}

class Surgery {
  constructor(surgery) {
    this.date = surgery.date || '.';
    this.procedure = surgery.procedure || ' ';
    this.physician = surgery.physician || ' ';
    this.hospital = surgery.hospital || ' ';
    this.notes = surgery.notes || ' ';
  }
}

class Illness {
  constructor(illness) {
    this.illness = illness.illness || '.';
    this.start = illness.start || ' ';
    this.end = illness.end || ' ';
    this.hospital = illness.hospital || ' ';
    this.notes = illness.notes || ' ';
  }
}

class DrugInventory {
  constructor(drugInventory) {
    this.date = drugInventory.date || ' ';
    this.patientName = drugInventory.patientName || ' ';
    this.mrn = drugInventory.mrn || ' ';
    this.quantity = drugInventory.quantity || ' ';
    this.lotNumber = drugInventory.lotNumber || ' ';
    this.expiration = drugInventory.expiration || ' ';
    this.patientEducated = drugInventory.patientEducated || ' ';
    this.physician = drugInventory.physician || ' ';
    this.signature = '       .';
  }
}

module.exports = {
  Medication,
  Surgery,
  Illness,
  DrugInventory
};
