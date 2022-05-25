const readline = require('readline')
const InputHandler = require('./handlers/input-handler')
const inputHandler= new InputHandler();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const input1 = () => {
  console.log(`Please enter the following`)
  return new Promise((resolve, reject) => {
    rl.question('Student ID: ', (input) => {
      const result  = inputHandler.input(input.trim(), 'stuId')
      if(result){
        resolve(input)
      }else{
        rl.setPrompt('Please try again! \n')
        rl.prompt()
        rl.on('line', (userInput)=>{
          const result  = inputHandler.input(userInput.trim(), 'stuId')
          if(result){
            resolve(userInput)
          }else{
            rl.setPrompt('Please try again! \n')
            rl.prompt()
          }
        })
      }   
    })
  })
}

const input2 = (studentId) => {
  return new Promise((resolve, reject) => {
    rl.question('Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): ', (reportNo) => {
      if(reportNo && reportNo.length===1){
        const result  = inputHandler.input(reportNo.trim(), 'reportNo', studentId)
        if(result){
          resolve()
        }else{
          rl.setPrompt('Please try again! \n')
          rl.prompt()
          rl.on('line', (userInput)=>{
            const result  = inputHandler.input(userInput.trim(), 'reportNo', studentId)
            if(result){
              resolve()
            }else{
              rl.setPrompt('Please try again! \n')
              rl.prompt()
            }
          })
        }
      }else{
        rl.setPrompt('The given report number is wrong! Please restart the application and try again!')
        rl.prompt()
      }  
    })
  })
}

const main = async () => {
  const studentId = await input1()
  await input2(studentId)
  rl.close()
}

main()
  