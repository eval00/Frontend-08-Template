const http = require('http');

const responseBody = `<html maaa=a>
<head>
    <style>
        body div #myid {
            width: 100px;
            background-color: #ff5000;
        }
        body div img {
            width: 30px;
            background-color: #ff1111;
        }
    </style>
</head>
<body>
    <div>
        <img id="myid" />
        <img />
    </div>
</body>
</html>
`

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
        console.log(`body: "${body}"`);

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(responseBody);
    });
}).listen(8088);

console.log('server started');