
let http = require('http');

let fs = require('fs');

let path = require('path');

let app = http.createServer();

app.listen(3000, (err) => {
    if(!err) {
        console.log('服务器已启动在3000端口');
    }
});

app.on('request', (req, res) => {

    // 根据请求做处相应的响应
    // let realPath = req.url == '/' ? 'index.html' : path.join('.', req.url);
    
    let realPath = req.url == '/' ? 'doc.html' : req.url;

    // 
    realPath = path.join('.', realPath);

    function render(path) {
        fs.readFile(path, (err, data) => {
            if(err) {
                res.writeHeader('404');
                res.write('<h1>404 Not Found!</h1>');

                return res.end();
            }

            res.write(data);

            res.end();
        })
    }

    render(realPath);

    // if(req.url == '/') {
    //     render(realPath);
    // } else {
    //     render(realPath);
    // }

})