let http = require('http');
let https = require('https');
let unzipper = require('unzipper');
let querystring = require('querystring');

// 2. auth 路由：接受 code，用 code + client_id + client_secret 换 token
function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    getToken(query.code, (info) => {
        console.log(info);
        // response.write(JSON.stringify(info));
        response.write(`<a href='http://localhost:5000/?token=${info.access_token}'>publish</a>`);
        response.end();
    });
}

function getToken(code, callback) {
    let clientId = 'Iv1.d32b45d6e9bb56a7';
    let clientSecret = 'd827f86c21b487fcabcd99481c3cf9e99b7cc430';
    let path = `/login/oauth/access_token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}`;
    let request = https.request({
        hostname: 'github.com',
        path,
        port: 443,
        method: 'POST',
    }, function(response) {
        let body = '';
        response.on('data', chunk => {
            body += chunk.toString();
        });
        response.on('end', chunk => {
            callback(querystring.parse(body));
        });
    });
    request.end();
}

// 4. publish 路由：用 token 获取用户信息，检查权限，接受发布
function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);

    getUser(query.token, (info) => {
        if(info.login === 'eval00') {            
            request.pipe(unzipper.Extract({ path: '../server/public/' }));
            request.on('end', () => {
                response.end('success');
            });
        }
    });
}

function getUser(token, callback) {
    let request = https.request({
        hostname: 'api.github.com',
        path: '/user',
        port: 443,
        method: 'GET',
        headers: {
            Authorization: `token ${token}`,
            'User-Agent': 'toy-publish',
        },
    }, function(response) {
        let body = '';
        response.on('data', chunk => {
            body += chunk.toString();
        });
        response.on('end', chunk => {
            callback(JSON.parse(body));
        });
    });
    request.end();
}

http.createServer(function(request, response) {
    if(request.url.match(/^\/auth\?/)) {
        return auth(request, response);
    } else if(request.url.match(/^\/publish\?/)) {
        return publish(request, response);
    }

    // console.log('request');
}).listen(4000);
