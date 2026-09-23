const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Server is running successfully!");
    }

    else if (req.url === "/hello") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello from Node.js server!");
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page not found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});