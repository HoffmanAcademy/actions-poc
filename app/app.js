const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.APP_PORT;

app.use(cors());

app.get('/', (req, res) => {
    res.send(JSON.stringify({ message: 'Hello World!' }))
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});