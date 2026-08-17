const student = require("./student");
const { marks, getTotalMarks, getPercentage } = require("./marks");
const { getAttendancePercentage } = require("./attendance");
const getGrade = require("./grade");
const utils = require("./utils");

function generateReport() {

    const total = getTotalMarks();
    const percentage = getPercentage();
    const attendance = getAttendancePercentage();

    const report = getGrade(percentage);

    utils.printHeading("STUDENT REPORT CARD");

    console.log("\nStudent Information\n");

    console.log("Name       :", student.name);
    console.log("Roll No    :", student.rollNo);
    console.log("Class      :", student.class);
    console.log("Section    :", student.section);
    console.log("Age        :", student.age);

    console.log("\n--------------------");

    console.log("\nSubject Marks\n");

    console.log("Mathematics        :", marks.mathematics);
    console.log("English            :", marks.english);
    console.log("Computer Science   :", marks.computerScience);
    console.log("DBMS               :", marks.dbms);
    console.log("JavaScript         :", marks.javascript);

    console.log("\n--------------------");

    console.log("\nTotal Marks  :", total);
    console.log("Percentage   :", utils.formatPercentage(percentage));
    console.log("Attendance   :", utils.formatPercentage(attendance));

    console.log("\nGrade        :", report.grade);
    console.log("Result       :", report.result);

    utils.printLine();
}

module.exports = generateReport;