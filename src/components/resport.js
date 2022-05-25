/**
 * Abstract Class Report.
 * @class Report
 */ 
const moment = require('moment');
const dateFormat = require('../utils/date');

 class Report {
    constructor() {
      if (this.constructor == Report) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
  
    generateReport(){
      throw new Error("Method 'generateReport()' must be implemented.");
    }

    dateFormat(date){
        let newDate = dateFormat(date)
        newDate = moment(newDate).format('Do MMM YYYY HH:mm A')
        return newDate
    }
}
module.exports = Report