class CareFormDTO {
  constructor() {
    this.id = -1;
    this.submittedByEmail = '';
    this.submittedByName = '';
    this['3.3.1'] = '';
    this['3.3.2'] = '';
    this['3.3.3'] = '';
    this['3.3.4'] = 0;
    this['3.3.5'] = 0;
    this['Social Security Number'] = 0;
    this['3.3.6'] = 0;
    this['3.3.7'] = new Date();
    this['3.3.8'] = new Date();
    this['3.3.9'] = '';
    this['3.4.1'] = '';
    this['3.4.2'] = [];
    this['3.4.3'] = [];
    this['3.4.6'] = [];
    this['3.4.7'] = '';
    this['3.4.8'] = '';
    this['3.4.9'] = '';
    this['3.4.10'] = '';
    this['3.4.11'] = '';
    this['3.4.12'] = '';
    this['3.4.13'] = '';
    this['3.4.14'] = '';
    this['3.4.4'] = '';
    this['3.4.5'] = '';
    this['3.3.10'] = '';
    this['3.6.1'] = '';
    this['3.6.2'] = '';
    this['3.8.1'] = 0;
    this['3.8.2'] = true;
    this['3.9.1'] = '';
    this['3.9.2'] = 0;
    this['3.9.3'] = 0;
    this['3.9.4'] = 0;
    this['3.9.5'] = 0;
    this['3.11.1'] = true;
    this['3.11.2'] = '';
    this['3.11.3'] = '';
    this['3.11.4'] = '';
    this['3.11.5'] = true;
    this['3.11.6'] = new Date();
    this['3.13.1'] = 0;
    this['3.13.2'] = 0;
    this['3.3.11'] = new Date();
    this['3.5.1'] = '';
    this['3.5.6'] = true;
    this['3.5.7'] = '';
    this['3.5.8'] = true;
    this['3.5.9'] = '';
    this['3.5.13'] = '';
    this['3.5.17'] = '';
    this['3.5.21'] = '';
    this['3.5.22'] = '';
    this['3.5.23'] = '';
    this['3.7.1'] = true;
    this['3.7.2'] = true;
    this['3.7.3'] = '';
    this['3.7.4'] = '';
    this['3.7.5'] = '';
    this['3.7.6'] = '';
    this['3.7.7'] = '';
    this['3.10.1'] = true;
    this['3.10.2'] = new Date();
    this['3.10.3'] = '';
    this['3.5.2'] = '';
    this['3.5.5'] = '';
    this['3.5.3'] = '';
    this['3.5.4'] = '';
    this['3.5.10'] = '';
    this['3.5.11'] = '';
    this['3.5.12'] = '';
    this['3.5.14'] = '';
    this['3.5.15'] = '';
    this['3.5.16'] = '';
    this['3.5.18'] = '';
    this['3.5.19'] = '';
    this['3.5.20'] = '';
    this['3.12.1'] = new Date();
    this['3.12.4'] = true;
    this['3.12.5'] = '';
    this['3.12.6'] = '';
    this['3.12.2'] = new Date();
    this['3.12.3'] = new Date();
    this['3.3.12'] = new Date();
    this['3.3.13'] = '';
    this['3.3.14'] = '';
  }

  setCareForm(property, value) {
    if (this.hasOwnProperty(property)) {
      this[property] = value;
    } else {
      console.error(`Property ${property} does not exist on CareFormDTO`);
    }
  }
}

export default CareFormDTO;
