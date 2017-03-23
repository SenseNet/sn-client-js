import * as Http from 'http';

export class Download {

    constructor(private host: string, private path: string) {
    }

    private headers: any = {};
    public Authenticate(username: string, password: string): Download {
        let auth = 'Basic ' + new Buffer(`${username}:${password}`).toString('base64');
        this.headers['Authorization'] = auth;
        return this;
    }

    public GetAsBufferAsync(): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            Http.get({
                host: this.host,
                path: this.path,
                headers: this.headers,
            }, (response: Http.IncomingMessage) => {
                if (response.readable) {
                    let data = [];
                    let contentLength: number = parseInt(response.headers['content-length']);
                    response.on('data', chunk => {
                        data.push(chunk);
                    })

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