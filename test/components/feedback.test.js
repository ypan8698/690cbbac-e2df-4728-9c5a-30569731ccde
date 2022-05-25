import FeedbackReport from "../../src/components/feedback"

describe("FeedbackReport", () => {
    const feedbackReport = new FeedbackReport();
  
    test("generateReport is a function", () => {
        expect(typeof feedbackReport.generateReport).toBe("function");
    });

    test("_recentlyCompletedQuestion is a function", () => {
        expect(typeof feedbackReport._recentlyCompletedQuestion).toBe("function");
    })
});