const totalClasses = 100;
const attendedClasses = 90;

function getAttendancePercentage() {
    return (attendedClasses / totalClasses) * 100;
}

module.exports = {
    totalClasses,
    attendedClasses,
    getAttendancePercentage
};