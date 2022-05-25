/**
 * @class ProgressReport
 * @extends {Report}
 */
 const moment = require('moment');
 const StudentsHandler = require('../handlers/students-handler')
 const Report = require('../components/resport')
 const studentsHandler= new StudentsHandler();
 const ErrorHandler = require('../handlers/error-handler')
 const errorHandler= new ErrorHandler();
 const dateFormat = require('../utils/date');

 class ProgressReport extends Report {
    generateReport(data) {
      try{
        const results = this._getHistoryDataById(data)
        if(results){
            console.log(`${results.studentName} has completed ${results.assessmentsName} ${results.completedCount} times in total. Date and raw score given below: \n`)
            if(results.assessmentHistory){
                const assessmentHistory = results.assessmentHistory
                  for (const index in assessmentHistory){
                      let completeDate = assessmentHistory[index]['completeDate']
                      console.log(`Date: ${this.dateFormat(completeDate)}, Raw Score: ${assessmentHistory[index]['rawScore']} out of ${assessmentHistory[index]['totalAttempts']}`)
                  }
              }
              const firstAttemptScore = results.firstAttemptScore
              const lastAttemptScore = results.lastAttemptScore
              const temp = lastAttemptScore - firstAttemptScore 
              if(temp > 0){
                  console.log(`${results.studentName} got ${temp} more correct in the recent completed assessment than the oldest`)
              }else{
                  console.log(`${results.studentName} didn't show much improvement in the recent completed assessment`)
              }  
            }
      }catch(error){
        errorHandler.error(error)
      }
    }
    
    _getHistoryDataById(data){
        const results = studentsHandler.getHistoryDataById(data)
        return results
    }

    dateFormat(date){
        let newDate = dateFormat(date)
        newDate = moment(newDate).format('Do MMM YYYY') // reformat the date as 16th Dec 2019 without showing the time
        return newDate
    }
    

}
module.exports = ProgressReport
