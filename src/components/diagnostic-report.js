/**
 * @class DiagnosticReport
 * @extends {Report}
 */
 const StudentsHandler = require('../handlers/students-handler')
 const Report = require('../components/resport')
 const studentsHandler= new StudentsHandler();
 const ErrorHandler = require('../handlers/error-handler')
 const errorHandler= new ErrorHandler();
 class DiagnosticReport extends Report {
    generateReport(data) {
        try{
            const results = this._recentlyCompletedQuestion(data)
            if(results){
                console.log(`${results.studentName} recently completed ${results.assessmentsName} on ${super.dateFormat(results.completed)}`)
                this.dateFormat(results.completed)
                console.log(`He got ${results.results.rawScore} right out of ${results.results.totalAttempts}. Details by strand given below: \n`)
                if(results.strands){
                  let keys = Object.keys(results.strands)
                  if(keys){
                      for (const index in keys){
                          const strand = results.strands[keys[index]]
                          console.log(`${keys[index]}: ${strand['correctNo']} out of ${strand['totalNo']}`)
                      }
                  }
                }
            }
        }catch(error){
            errorHandler.error(error)
        }
    }
    _recentlyCompletedQuestion(data){
        const results = studentsHandler.getRecentAssessment(data)
        return results
    }
}
module.exports = DiagnosticReport
