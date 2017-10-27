
let http = require('http');

let url = require('url');

let fs = require('fs');

let path = require('path');

let template = require('art-template');

// 配置模板引擎
template.defaults.root = __dirname;
template.defaults.extname = '.html';

let server = http.createServer();

server.listen(3000);

server.on('request', (req, res) => {

    // 路由是 地址 与 程序 间的映射关系
    
    // 路由是由开发人员设计的
    
    // 通过 req.url 可以获得地址，（不包含参数）
        
    let {pathname} = url.parse(req.url);

    let realPath = path.join('./', pathname);

    res.render = function (tpl, data) {

        // 当引入 art-Template 模板引擎后
        // 会得到一个函数叫 template 

        // 调用这个函数
        // template(模板路径, 数据);
        
        // 默认去根径下找（在Window下 盘符即根路径）
        // （Linux 下 / 表示根路径）
        let html = template('index', data);

        // console.log(html);
        
        res.write(html);

        res.end();

        // fs.readFile(tpl + '.html', (err, data) => {
        //     res.write(data);
        //     res.end();
        // });
    }

    switch(pathname) {
        case '/':
            // 响应 index.html
            console.log('来到了 a 路由');

            var title = '首页';

            res.render('index', {title: title});
        break;

        case '/doc':
            // 响应 doc.html
            console.log('来到了 b 路由');
            res.render('doc');
        break;

        case '/blog':
            // 响应 blog.html
            console.log('来到了 c 路由');
            res.render('blog');
        break;

        default:
            fs.readFile(realPath, (err, data) => {
                if(!err) {
                    res.write(data);
                    res.end();
                }
            })
    }
})