const http = require("http");

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/student") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Student data received successfully");
    }

    else if (req.method === "GET" && req.url === "/employee") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Employee data received successfully");
    }

    
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - URL Not Found");
    }
});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});