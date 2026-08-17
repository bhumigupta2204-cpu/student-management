const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let students = [];

rl.question("Enter student name: ", (name) => {
    rl.question("Enter course: ", (course) => {
        rl.question("Enter semester: ", (semester) => {

            students.push({
                name: name,
                course: course,
                semester: semester
            });

            fs.writeFile(
                'student.txt',
                JSON.stringify(students, null, 2),
                (err) => {

                    if (err) throw err;

                    console.log('File written successfully');

                    fs.open('student.txt', 'r', (err, file) => {
                        if (err) throw err;

                        console.log('File opened successfully');

                        fs.readFile('student.txt', 'utf8', (err, data) => {
                            if (err) throw err;

                            console.log('\nStudent Details:');
                            console.log(data);

                            // Delete file
                            fs.unlink('student.txt', (err) => {
                                if (err) throw err;

                                console.log('File deleted successfully');

                                rl.close();
                            });
                        });
                    });
                }
            );
        });
    });
});