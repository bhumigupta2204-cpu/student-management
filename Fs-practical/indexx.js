const fs = require('fs');

let flag = 'w';


fs.open('demo.txt', flag, (err, fd) => {
    if (err) throw err;

    console.log('File created successfully');

    fs.close(fd, () => {
        
        fs.unlink('demo.txt', (err) => {
            if (err) throw err;

            console.log('File deleted successfully');
        });
    });
});