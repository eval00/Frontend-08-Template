let http = require('http');
let fs = require('fs');
let archiver = require('archiver');
let child_process = require('child_process');
let querystring = require('querystring');

// 1. 打开 https://github.com/login/oauth/authorize
child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.d32b45d6e9bb56a7`);

// 3. 创建 server，接受 token，后点击发布
http.createServer(function(request, response) {
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    publish(query.token);
}).listen(5000);

function publish(token) {
    let request = http.request({
        hostname: '127.0.0.1',
        port: 4000,
        method: 'POST',
        path: '/publish?token=' + token,
        headers: {
            'Content-Type': 'application/Octet-stream',
            // 'Content-Length': stats.size,
        },
    }, response => {
        console.log(response);
    });
    
    // let file = fs.createReadStream('./sample.html');
    
    const archive = archiver('zip', {
        zlib: { level: 9 },
    });
    
    archive.directory('./sample/', false);
    
    archive.finalize();
    
    archive.pipe(request);
}
