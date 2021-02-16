class Request {
    constructor(options) {
        // 请求行：POST / HTTP/1.1
        this.method = options.method || 'GET';
        this.path = options.path || '/';

        // headers 的 Host 字段
        this.host = options.host;
        this.port = options.port || 80;

        this.headers = options.headers || {};
        this.body = options.body || {};

        // HTTP 请求头必须要有 Content-Type
        if(!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if(this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        // HTTP 请求头必须要有 Content-Length
        this.headers['Content-Length'] = this.bodyText.length;
    }

    send() {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            resolve('');
        });
    }
}

class ResponseParser {
    constructor() {

    }
    receive(string) {
        for(let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char) {
        
    }
}

void async function() {
    const request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            'X-Foo2': 'customed',
        },
        body: {
            name: 'winter',
        },
    });

    const response = await request.send();

    console.log(response);
}();