import DiagnosticReport from "../../src/components/diagnostic-report";

describe("DiagnosticReport", () => {
    const diagnosticReport = new DiagnosticReport();
  
    test("generateReport is a function", () => {
        expect(typeof diagnosticReport.generateReport).toBe("function");
    });

    test("_recentlyCompletedQuestion is a function", () => {
        expect(typeof diagnosticReport._recentlyCompletedQuestion).toBe("function");
    })
});