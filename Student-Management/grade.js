function getGrade(percentage) {

    let grade;

    if (percentage >= 90)
        grade = "A+";
    else if (percentage >= 80)
        grade = "A";
    else if (percentage >= 70)
        grade = "B";
    else if (percentage >= 60)
        grade = "C";
    else if (percentage >= 40)
        grade = "D";
    else
        grade = "F";

    let result = percentage >= 40 ? "PASS" : "FAIL";

    return { grade, result };
}

module.exports = getGrade;