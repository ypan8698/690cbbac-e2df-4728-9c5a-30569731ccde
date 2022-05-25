/**
 * @class FeedbackReport
 * @extends {Report}
 */
 const StudentsHandler = require('../handlers/students-handler')
 const Report = require('../components/resport')
 const studentsHandler= new StudentsHandler();
 const ErrorHandler = require('../handlers/error-handler')
 const errorHandler= new ErrorHandler();
 class FeedbackReport extends Report {
    generateReport(data) {
        try{
            const results = this._recentlyCompletedQuestion(data)
            if(results){
                console.log(`${results.studentName} recently completed ${results.assessmentsName} on ${super.dateFormat(results.completed)}`)
                if(results.rawScore < results.totalAttempts){
                    console.log(`He got ${results.rawScore} right out of ${results.totalAttempts}. Feedback for wrong answers given below \n`)
                    if(results.details){
                        const details = results.details
                        for (const index in details){
                            console.log(`Question: ${details[index]['question']}`)
                            console.log(`Your answer: ${details[index]['wrongLabel']} with value ${details[index]['yourAnswer']}`)
                            console.log(`Right answer: ${details[index]['rightLabel']} with value ${details[index]['rightAnswer']}`)
                            console.log(`Hint: ${details[index]['hint']} \n`)
                        }
                      }
                    } else{
                        console.log(`He got ${results.rawScore} right out of ${results.totalAttempts}. Well done! \n`)
                    }     
                }
            }catch(error){
                 errorHandler.error(error)
        }
      }
    
    _recentlyCompletedQuestion(data){
        const results = studentsHandler.getRecentAssessment(data, true)
        return results
    }
}
module.exports = FeedbackReport
