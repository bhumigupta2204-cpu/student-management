// student.js

function addStudent(name) {
    console.log(name + " added successfully.");
}

function removeStudent(name) {
    console.log(name + " removed successfully.");
}

function updateStudent(name) {
    console.log(name + " updated successfully.");
}

function displayStudents() {
    console.log("Students: Rahul, Priya, Aman");
}

module.exports = {
    addStudent,
    removeStudent,
    updateStudent,
    displayStudents
};