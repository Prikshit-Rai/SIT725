import { Server } from 'socket.io';
import { createServer } from 'http';
import { expect } from 'chai';
import { io as Client } from 'socket.io-client';

let io, serverSocket, clientSocket;

describe('Socket.IO Tests', function () {
    this.timeout(5000);

    before((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = Client(`http://localhost:${port}`);

            io.on('connection', (socket) => {
                serverSocket = socket;
                socket.on('convert', (data) => {
                    socket.emit('conversionResult', { result: '77.00', unit: 'F' });
                });
            });

            clientSocket.on('connect', done);
        });
    });

    after(() => {
        io.close();
        clientSocket.close();
    });

    it('should receive conversion result via socket', (done) => {
        clientSocket.emit('convert', { type: 'convertCtoF', value: 25 });
        clientSocket.on('conversionResult', (data) => {
            expect(data).to.have.property('result', '77.00');
            expect(data).to.have.property('unit', 'F');
            done();
        });
    });
});