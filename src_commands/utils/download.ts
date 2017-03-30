import * as Http from 'http';

/**
 * This class represents a Download from a specified Sense/Net Repository
 */
export class Download {

    /**
     * @constructs Download
     * @param host {string} The hostname for the specified Sense/Net repository
     * @param path {string} The path to the download
     */
    constructor(private host: string, private path: string) {
    }

    /**
     * The request headers to be send
     */
    private headers: any = {};

    /**
     * Sets up the Basic Authentication headers
     * @param username {string} The username for the authentication
     * @param password {string} The password for the authentication
     */
    public Authenticate(username: string, password: string): Download {
        let auth = 'Basic ' + new Buffer(`${username}:${password}`).toString('base64');
        this.headers['Authorization'] = auth;
        return this;
    }

    /**
     * Executes the download request, flatterns the data into a simple in-memory buffer
     * @returns {Promise<Buffer>} An awaitable promise with the in-memory buffer
     */
    public GetAsBufferAsync(): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            Http.get({
                host: this.host,
                path: this.path,
                headers: this.headers,
            }, (response: Http.IncomingMessage) => {
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
            });
        });
    }
}