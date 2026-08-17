const marks = {
    mathematics: 70,
    english: 82,
    computerScience: 90,
    dbms: 78,
    javascript: 85
};

function getTotalMarks() {
    return marks.mathematics +
           marks.english +
           marks.computerScience +
           marks.dbms +
           marks.javascript;
}

function getPercentage() {
    return getTotalMarks() / 5;
}

module.exports = {
    marks,
    getTotalMarks,
    getPercentage
};