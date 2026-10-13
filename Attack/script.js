
const input = document.getElementById("userInput");
const output = document.getElementById("output");

document.getElementById("unsafeButton").addEventListener("click", () => {
  // innerHTML is unsafe for untrusted input because it parses HTML.
  output.innerHTML = input.value;
});

document.getElementById("safeButton").addEventListener("click", () => {
  output.textContent = input.value;
});

document.getElementById("clearButton").addEventListener("click", () => {
  output.textContent = "Your output will appear here.";
  input.value = "";
});

document.getElementById("lengthButton").addEventListener("click", () => {
  output.textContent = "Number of characters: " + input.value.length;
});
