const http = require('http');

http.createServer((request, response) => {
    const { headers, method, url, httpVersion } = request;
    let body = [];
    request.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        console.log();
        console.log(method, url, `HTTP/${httpVersion}`); // 请求行：POST / HTTP/1.1
        console.log('headers:', headers);
        console.log('body:', body);

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(`Hello World`);
    });
}).listen(8088);

console.log('server started');