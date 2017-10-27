
let http = require('http');

let url = require('url');

let fs = require('fs');

// 引入模板引擎
let template = require('art-template');

// 配置模板路径
template.defaults.root = './';
// 配置模板后缀
template.defaults.extname = '.html';

let app = http.createServer();

app.listen(3000);

app.on('request', (req, res) => {

    // 路由不完全等于地址
    
    // http://主机:端口/路径?参数
    // 经过 url.parse 处理后，可以分别获得
    // 完整地址的各个组成部分
    // 其中 pathname 为路径部分
    let {pathname} = url.parse(req.url);

    // 根据请求，处理成真实的资源路径
    let realPath = '.' + pathname;

    // 对模板模板引擎进行封装
    res.render = function (tpl, data) {
        // 调用模板引擎（传递模板名称和数据）
        let html = template(tpl, data);

        // html 是响应的结果（拼凑好数据的html字符串）
        // 响应给浏览器
        res.write(html);

        // 结束响应
        res.end();
    }

    switch(pathname) {
        case '/':
            // 假数据（正常情况下从数据库中取出）
            let data = {
                title: '许愿墙',
                info: '学习使用模板引擎'
            }

            // 渲染页面
            res.render('index', data);

        break;

        default :
            // 读取静态资源
            fs.readFile(realPath, (err, data) => {
                if(!err) {
                    res.write(data);

                    res.end();
                }
            })
    }
})