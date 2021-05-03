// dependencies
const express = require('express');

// create the server
const app = express();
const port = process.env.PORT || 4002

app.post('/place', (req, res) = {

});

app.get('/places', (req, res) => {

});

app.post('review/:placeName', (req, res) => {

});

app.get('/search/:placeName/:location', (req, res) => {

});

app.listen(port, () => console.log('Listening on port ' + port));