import ProgressReport from '../../src/components/progress-report'

describe("ProgressReport", () => {
    const progressReport = new ProgressReport();
  
    test("generateReport is a function", () => {
        expect(typeof progressReport.generateReport).toBe("function");
    });

    test("_getHistoryDataById is a function", () => {
        expect(typeof progressReport._getHistoryDataById).toBe("function");
    })

    test("dateFormat is a function", () => {
        expect(typeof progressReport.dateFormat).toBe("function");
    })
});