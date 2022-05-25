const ErrorHandler = require( "../../src/handlers/error-handler");

describe("InputHandler", () => {
    const errorHandler = new ErrorHandler();
  
    test("_handleMessage is a function", () => {
        expect(typeof errorHandler._handleMessage).toBe("function");
    });

    test("error is a function", () => {
        expect(typeof errorHandler.error ).toBe("function");
    })

    test("warning is a function", () => {
        expect(typeof errorHandler.warning ).toBe("function");
    })
});