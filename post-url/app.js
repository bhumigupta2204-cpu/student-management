const http = require("http");

const server = http.createServer((req, res) => {

    // Student URL
    if (req.method === "GET" && req.url === "/student") {

        const student = {
            name: "Bhumi",
            rollNo: 101,
            marks: 85
        };

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(student));
    }

    // Employee URL
    else if (req.method === "GET" && req.url === "/employee") {

        const employee = {
            name: "Sujeet",
            id: 102,
            salary: 30000
        };

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(employee));
    }

    // 404 Error
    else {

        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            error: "404 - URL Not Found"
        }));
    }
});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});