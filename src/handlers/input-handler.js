const {InputType} = require('../utils/constants.js') 
const ErrorHandler = require('./error-handler')
const errorHandler= new ErrorHandler();
const StudentsHandler = require('../handlers/students-handler')
const studentsHandler= new StudentsHandler();
const DiagnosticReport = require('../components/diagnostic-report')
const diagnosticReport= new DiagnosticReport();
const FeedbackReport = require('../components/feedback')
const feedbackReport= new FeedbackReport();
const ProgressReport = require('../components/progress-report')
const progressReport= new ProgressReport();

class InputHandler {
    input(input, type, data = '') {
        try {
         const result =  this._handleInput(input, type, data)
         return result
        } catch (ignored) { }
      }
    
    _handleInput(input= '', type, data= '') {
        try{
            let isValidInput = false
            if (type) {
              switch (type) {
                case InputType.StudentId:
                    isValidInput = studentsHandler.handleStudentId(input)
                  break
                case InputType.ReportNumber:
                    isValidInput = this._handleReportNo(input, data)
                  break
                default:
                    isValidInput = studentsHandler.handleStudentId(input)
              }
            }
            return isValidInput

        }catch(error){
            errorHandler.error(error)
        }  
    }

    _handleReportNo(reportNo, data=''){
        if(reportNo=== '1' || reportNo=== '2' || reportNo=== '3'){
            switch (reportNo) {
                case '1':
                    diagnosticReport.generateReport(data)
                  break
                case '2':
                    progressReport.generateReport(data)
                  break
                case '3':
                    feedbackReport.generateReport(data)
                break
                default:
                    diagnosticReport.generateReport(data)
              }
            return true
        }
         return false
    }
}

module.exports = InputHandler