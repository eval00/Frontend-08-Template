const http = require('http');

const responseBody = `<html maaa=a>
<head>
    <style>
        #container {
            width: 500px;
            height: 300px;
            display: flex;
            background-color: rgb(255,255,255);
        }
        #container #mydiv {
            width: 200px;
            height: 100px;
            background-color: rgb(255,0,0);
        }
        #container .c1 {
            flex: 1;
            background-color: rgb(0,255,0);
        }
    </style>
    <title>hello</title>
</head>
<body>
    <div id="container">
        <div id="mydiv" />
        <div class="c1" />
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