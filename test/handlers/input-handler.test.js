const InputHandler = require("../../src/handlers/input-handler")

describe("InputHandler", () => {
    const inputHandler = new InputHandler();
  
    test("getQuestionDetails is a function", () => {
        expect(typeof inputHandler._handleInput).toBe("function");
    });

    test("handleStrands is a function", () => {
        expect(typeof inputHandler._handleReportNo ).toBe("function");
    })
});