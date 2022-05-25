import QuestionsHandler from "../../src/handlers/questions-handler";

describe("QuestionsHandler", () => {
    const questionsHandler = new QuestionsHandler();
  
    test("getQuestionDetails is a function", () => {
        expect(typeof questionsHandler.getQuestionDetails).toBe("function");
    });

    test("handleStrands is a function", () => {
        expect(typeof questionsHandler.handleStrands).toBe("function");
    })
});