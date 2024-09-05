const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('convert', { type: 'convertCtoF', value: 25 });

    socket.on('conversionResult', (data) => {
        console.log('Conversion result received:', data);
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
