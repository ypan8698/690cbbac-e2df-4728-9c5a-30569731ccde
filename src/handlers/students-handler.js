const ErrorHandler = require('./error-handler')
const errorHandler= new ErrorHandler();
const QuestionsHandler = require('./questions-handler')
const questionsHandler= new QuestionsHandler();
const students = require('../../sample-data/students.json') 
const assessments = require('../../sample-data/assessments.json') 
const studentResponses = require('../../sample-data/student-responses.json') 
const dateFormat = require('../utils/date');

class StudentsHandler {
  handleStudentId(studentId){
        if(studentId && studentId.length){
            if(studentId.length > 30){
                errorHandler.warning("The given student Id is too long! Please double check!")
                return
            }
            const isStudentId = this._validateId(studentId)
            return isStudentId
        }
        else{
            errorHandler.warning("The given student Id is empty!")
        }
      return false 
    }

  _validateId(studentId){
        if(students && students.length){
           for(const index in students){
               if(studentId === students[index].id){
                   return true
               }
           }
        }else{ 
          errorHandler.warning("Please add the user first!")
          return false
        }
        errorHandler.warning("The given student Id is invalid!")
        return false
    }

  _getStudentNameById(studentId){
      if(students && students.length){
        for(const index in students){
          try{
            if(students[index].id && (studentId === students[index].id)){
              return `${students[index].firstName} ${students[index].lastName}`
          }
        }catch(error){
            errorHandler.error(error)
          }    
        }
      }
        return ''
    }

  _getAssessmentsNameById(id){
      if(assessments && students.length){
        for(const index in assessments){
          try{
            if(assessments[index].id && id === assessments[index].id){
              return assessments[index].name
            }
          }catch(error){
            errorHandler.error(error)
          }       
      }
        return '' 
    }
  }
  
  /* This function takes in two inputs- studentId and getQuestionDetails. studentId variable is the student id in student.json file
    getQuestionsDetails variable is a boolean value. When it equals to true, that means user wants to generate the Feedback report. Thus, we will call getQuestionDetails function to get question details.
    when it equals to false, this function will prepare the data for Diagnostic report, otherwise, it's for Feedback report
    the returned data when getQuestionDetails equals to false is the same format as the example below:
    {
      id: 'studentReponse3',
      assessmentId: 'assessment1',
      assigned: '14/12/2021 10:31:00',
      started: '16/12/2021 10:00:00',
      completed: '16/12/2021 10:46:00',
      student: { id: 'student1', yearLevel: 5 },
      responses: [
        { questionId: 'numeracy1', response: 'option3' },
        { questionId: 'numeracy2', response: 'option4' }
      ],
      results: { rawScore: 15, totalAttempts: 16 },
      strands: {
        'Number and Algebra': { totalNo: 5, correctNo: 5 },
        'Measurement and Geometry': { totalNo: 7, correctNo: 7 },
        'Statistics and Probability': { totalNo: 4, correctNo: 3 }
      },
      studentName: 'Tony Stark',
      assessmentsName: 'Numeracy'
    }
  */
  getRecentAssessment(studentId, getQuestionDetails = false){
    try{
      if(studentResponses && studentResponses.length){
        let studentCompleteDate = ''
        let recentCompleted = null
        for (const index in studentResponses){
          try{
            if(studentResponses[index].student && studentResponses[index].student.id){
              if(studentResponses[index].student.id === studentId && studentResponses[index].completed){
                if(!studentCompleteDate || dateFormat(studentCompleteDate).getTime() < dateFormat(studentResponses[index].completed).getTime()){
                  studentCompleteDate = studentResponses[index].completed
                  recentCompleted = studentResponses[index]
                }
              }  
            }
          }catch(error){
            errorHandler.error(error)
          }
        }
        const assessmentId = recentCompleted.assessmentId
        const assessmentsName = this._getAssessmentsNameById(assessmentId)
        const studentName = this._getStudentNameById(studentId)
        if(!getQuestionDetails){
          const strands = questionsHandler.handleStrands(recentCompleted.responses) 
          recentCompleted.strands = strands
          recentCompleted.studentName = studentName
          recentCompleted.assessmentsName = assessmentsName
          recentCompleted.results.totalAttempts = recentCompleted.responses.length
          return recentCompleted 
        }else{
          let feedbackData = {}
          const questionsDetailsArray = questionsHandler.handleStrands(recentCompleted.responses, true) 
          feedbackData.details = questionsDetailsArray
          feedbackData.assessmentsName = assessmentsName
          feedbackData.studentName = studentName
          feedbackData.totalAttempts = recentCompleted.responses.length
          feedbackData.rawScore = recentCompleted.results.rawScore
          feedbackData.completed = recentCompleted.completed
          return feedbackData 
        }
      }
      return null
    }catch(error){
      errorHandler.error(error)
    }
  }
  
  /* This function takes in one input- studentId which is the student id in student.json file
     This function aims to prepare the data for Progress Report
     It will help calculate the total attempts the given student has completed based on the studentId,
     The details for the each of the attempts, and summary of the progress
     The returned data is the same format as the example below:
     {
      assessmentHistory: [
        {
          completeDate: '16/12/2019 10:46:00',
          rawScore: 6,
          totalAttempts: 16
        },
        {
          completeDate: '16/12/2020 10:46:00',
          rawScore: 10,
          totalAttempts: 16
        }
      ],
      completedCount: 2,
      firstAttemptScore: 6,
      lastAttemptScore: 10,
      assessmentsName: 'Numeracy',
      studentName: 'Tony Stark'
     }
  */
  getHistoryDataById(studentId){
    try{
      if(studentResponses && studentResponses.length){
        let HistoryData = {}
        HistoryData.assessmentHistory = []
        let completedCount = 0
        let firstAttemptDate = ''
        let lastAttemptDate = ''
        let firstAttemptScore = 0
        let lastAttemptScore = 0
        let assessmentId = ''

        for (const index in studentResponses){
          try{
            if(studentResponses[index].student && studentResponses[index].student.id){
              if(studentResponses[index].student.id === studentId && studentResponses[index].completed){
                const summaryData = studentResponses[index]
                completedCount+=1
                if(!lastAttemptDate || dateFormat(lastAttemptDate).getTime() < dateFormat(summaryData.completed).getTime()){
                  lastAttemptDate = summaryData.completed
                  lastAttemptScore = summaryData.results.rawScore
                  assessmentId = summaryData.assessmentId
                }
                if(index==0){
                  firstAttemptDate = summaryData.completed
                  firstAttemptScore = summaryData.results.rawScore
                }
                if(firstAttemptDate>= summaryData.completed){
                  firstAttemptDate = summaryData.completed
                  firstAttemptScore = summaryData.results.rawScore
                }
                let temp = {}        
                temp.completeDate = summaryData.completed
                temp.rawScore = summaryData.results.rawScore
                temp.totalAttempts = summaryData.responses.length
                HistoryData.assessmentHistory.push(temp)   
              }      
            }
          }catch(error){
            errorHandler.error(error)
          }
        }
        HistoryData.completedCount = completedCount
        HistoryData.firstAttemptScore = firstAttemptScore
        HistoryData.lastAttemptScore = lastAttemptScore
        HistoryData.assessmentsName = this._getAssessmentsNameById(assessmentId)
        HistoryData.studentName =  this._getStudentNameById(studentId)
        return HistoryData
      }
    }catch(error){
      errorHandler.error(error)
    }
    return null
  }
}

module.exports = StudentsHandler