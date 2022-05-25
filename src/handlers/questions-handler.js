const ErrorHandler = require('./error-handler')
const errorHandler= new ErrorHandler();
const questions = require('../../sample-data/questions.json') 

class QuestionsHandler {
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