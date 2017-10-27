
let http = require('http');

let fs = require('fs');

let app = http.createServer();

app.listen(3000);


app.on('request', (req, res) => {

    console.log(req.url);

    if(req.url == '/abc/bcd') {
        fs.readFile('./website/doc.html', (err, data) => {
            res.write(data);
            res.end();
        });
    }

})