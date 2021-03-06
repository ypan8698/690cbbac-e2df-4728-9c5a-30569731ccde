const ErrorHandler = require('./error-handler')
const errorHandler= new ErrorHandler();
const questions = require('../../sample-data/questions.json') 

class QuestionsHandler {
    /* This function takes in two inputs- assessment and getQuestionsDetails. assessment variable is a JSON object which is in the same format as the object in question,json file
    getQuestionsDetails variable is a boolean value. When it equals to true, that means user wants to generate the Feedback report. Thus, we will call getQuestionDetails function to get question details.
    when it equals to false, this function will prepare the data for Diagnostic report
    in order to generate and return a JSON object as the example below
    {
        'Number and Algebra': { totalNo: 5, correctNo: 5 },
        'Measurement and Geometry': { totalNo: 7, correctNo: 7 },
        'Statistics and Probability': { totalNo: 1, correctNo: 1 }
    }
    */
    handleStrands(assessment, getQuestionsDetails = false){
        let questionsDetailsArray= []
        if(questions && questions.length){
            let strands = {}
            for(const index in assessment){
                try{
                   const questionId = assessment[index].questionId
                   const response = assessment[index].response
                    for (const idx in questions){
                        if(questions[idx].id === questionId){
                            const correctKey = questions[idx].config.key
                            if(!getQuestionsDetails){
                                if(!strands[questions[idx].strand]){
                                    strands[questions[idx].strand] = {}
                                    strands[questions[idx].strand].totalNo = 1
                                    strands[questions[idx].strand].correctNo = response === correctKey ? 1 : 0
                                }else{
                                    let correctNo = strands[questions[idx].strand].correctNo
                                    strands[questions[idx].strand].totalNo +=1
                                    strands[questions[idx].strand].correctNo = response === correctKey ? correctNo + 1 : correctNo
                                }       
                            }else{
                                if(response !== correctKey){
                                    const questionDetails = this.getQuestionDetails(questions[idx], response)
                                    questionsDetailsArray.push(questionDetails)
                                }        
                            }
                          
                        }
                          
                    }
                }catch(error){
                   errorHandler.error(error)
                }       
            }
            return !getQuestionsDetails ? strands : questionsDetailsArray
        }
    }
    
    /* This function takes in two inputs- queston and response. question variable is a JSON object which is in the same format as the object in question,json file
       response variable is the student response id in student-responses.json
       what this function does is to generate and return a JSON object as the example below
       {
            question: "What is the 'median' of the following group of numbers 5, 21, 7, 18, 9?",
            hint: 'You must first arrange the numbers in ascending order. The median is the middle term, which in this case is 9',
            yourAnswer: '7',
            wrongLabel: 'A',
            rightAnswer: '9',
            rightLabel: 'B'
        }
    */
    getQuestionDetails(question, response){
        try{
            let questiondetails = {}
            let correntKey = question.config.key
            questiondetails.question = question.stem
            questiondetails.hint = question.config.hint
            const questionOptions = question.config.options
            for(const index in questionOptions){
                if(questionOptions[index].id === correntKey){
                    questiondetails.rightAnswer = questionOptions[index].value
                    questiondetails.rightLabel = questionOptions[index].label
                }
                if(questionOptions[index].id === response){
                    questiondetails.yourAnswer = questionOptions[index].value
                    questiondetails.wrongLabel = questionOptions[index].label
                }
            }
            return questiondetails

        }catch(error){
            errorHandler.error(error)
        }
    }
}

module.exports = QuestionsHandler