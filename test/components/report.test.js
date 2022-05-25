import Report from '../../src/components/resport'

describe("Report", () => {
    
    test("initiate abstract class report throw error", () => {
        const initiateReport = () => {const report = new Report();}
        expect(initiateReport).toThrow("Abstract classes can't be instantiated.")
    });

});