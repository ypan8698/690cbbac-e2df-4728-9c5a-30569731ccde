import StudentsHandler from "../../src/handlers/students-handler";

describe("StudentsHandler", () => {
    const studentsHandler = new StudentsHandler();
  
    test("_getAssessmentsNameById is a function", () => {
        expect(typeof studentsHandler._getAssessmentsNameById ).toBe("function");
    });

    describe("_validateID", () => {
        test("invalid id return false _validateID", () => {
            expect(() => studentsHandler._validateId("student4")).not.toBeTruthy()
        })

        test("valid id return true _validateID", () => {
            expect(() => studentsHandler._validateId("student3")).toBeTruthy()
        })

        test("_validateId is a function", () => {
            expect(typeof studentsHandler._validateId ).toBe("function");
        })
    })

    describe("_getStudentNameById", () => {
        test("_getStudentNameById is a function", () => {
            expect(typeof studentsHandler._getStudentNameById ).toBe("function");
        })

        test("invalid id return empty string", () => {
            expect(() => studentsHandler._getStudentNameById("student4")).toBe('')
        })

        test("valid id return student name", () => {
            expect(() => studentsHandler._validateId("student3")).toBe('Peter Parker')
        })
    })
    
    describe("handleStudentId", () => {
        test("handleStudentId is a function", () => {
            expect(typeof studentsHandler.handleStudentId ).toBe("function");
        })

        test("long studentID reutrn false", () => {
            expect(() => studentsHandler.handleStudentId('student3student3student3student3') ).not.toBeTruthy();
        })

        test("valid studentID reutrn true", () => {
            expect(() => studentsHandler.handleStudentId('student3') ).toBeTruthy();
        })

        test("null studentID reutrn false", () => {
            expect(() => studentsHandler.handleStudentId(null)).not.toBeTruthy();
        })

        test("empty strign id return false", () => {
            expect(() => studentsHandler.handleStudentId('')).not.toBeTruthy();
        })
    })

    describe("getRecentAssessment", () => {
        const student1RecentAssessment = studentsHandler.getRecentAssessment('student1')
        test("getRecentAssessment is a function", () => {
            expect(typeof studentsHandler.getRecentAssessment ).toBe("function");
        })

        test("getRecentAssessment return correct assessment", () => {
            expect(student1RecentAssessment.assessmentId).toBe('assessment1')
        })

        test("getRecentAssessment return correct totalScore", () => {
            expect(() => student1RecentAssessment.rawScore).toBe(15)
        })

        test("getRecentAssessment return correct algebra score", () => {
            expect(() => student1RecentAssessment.strands['Number and Algebra']).toBe(5)
        })

        test("getRecentAssessment return Geometry score", () => {
            expect(() => student1RecentAssessment.strands['Measurement and Geometry']).toBe(7)
        })
    })

    describe("getHistoryDataById", () => {
        test("getHistoryDataById is a function", () => {
            expect(typeof studentsHandler.getHistoryDataById ).toBe("function");
        })

        test("getHistoryDataById contain all attempt", () => {
            const history = studentsHandler.getHistoryDataById('student1')
            expect(history.assessmentHistory.length).toBe(3)
            expect(history.completedCount).toBe(3)
        })
    })
    
});