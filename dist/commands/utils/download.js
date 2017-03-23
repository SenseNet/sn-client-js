"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
class Download {
    constructor(host, path) {
        this.host = host;
        this.path = path;
        this.headers = {};
    }
    Authenticate(username, password) {
        let auth = 'Basic ' + new Buffer(`${username}:${password}`).toString('base64');
        this.headers['Authorization'] = auth;
        return this;
    }
    GetAsBufferAsync() {
        return new Promise((resolve, reject) => {
            Http.get({
                host: this.host,
                path: this.path,
                headers: this.headers,
            }, (response) => {
                if (response.readable) {
                    let data = [];
                    let contentLength = parseInt(response.headers['content-length']);
                    response.on('data', chunk => {
                        data.push(chunk);
                    });
                    response.on('end', () => {
                        let pos = 0;
                        let buffer = new Buffer(contentLength);
                        data.forEach(chunk => {
                            chunk.copy(buffer, pos);
                            pos += chunk.length;
                        });
                        resolve(buffer);
                    });
                }
                else {
                    reject();
                }
            });
        });
    }
}
exports.Download = Download;
//# sourceMappingURL=download.js.map