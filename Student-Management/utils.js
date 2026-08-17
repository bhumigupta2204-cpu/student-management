function printLine() {
    console.log("-----------------------------------");
}

function printHeading(title) {
    printLine();
    console.log(title);
    printLine();
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatPercentage(value) {
    return value.toFixed(0) + "%";
}

module.exports = {
    printLine,
    printHeading,
    capitalize,
    formatPercentage
};