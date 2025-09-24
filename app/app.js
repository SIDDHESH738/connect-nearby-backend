const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const messages = [
        'Hello, World!',
        'Hi there!',
        'Greetings!',
        'Welcome!',
        'Salutations!',
        'Howdy!',
        'Hey!',
        'Hello from the backend!'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    res.send(randomMessage);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});