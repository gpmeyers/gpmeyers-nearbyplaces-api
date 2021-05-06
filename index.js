// dependencies
const express = require('express');
const cors = require('cors');
const db = require('./db');

// create the server
const app = express();
const port = process.env.PORT || 4000;

// use cors
let corsOptions = {
    origin: 'https://gpmeyers.github.io',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors());

// parse json
app.use(express.json());

app.post('/place', (req, res) => {
    let name = req.body.name;
    let placelocation = req.body.placelocation;
    db.savePlace(name, placelocation)
    .then(() => res.send(`The place ${name} was added successfully.`))
    .catch(e => res.status(500).send(e));
});

app.get('/places', (req, res) => {
    db.getPlaces()
    .then(places => res.json(places))
    .catch(e => {console.log(e); res.status(500).send('There was an error in finding the places')});
});

app.post('review/:placeName', (req, res) => {
    let placeName = req.params.placeName;
    let review = req.body.review;
    db.saveReview(placeName, review)
    .then(() => res.send(`The review ${review} was added successfully.`))
    .catch(e => res.status(500).send(e));
});

app.get('/search/:placeName/:location', (req, res) => {
    let placeName = req.params.placeName;
    let location = req.params.location;

    db.findPlace(placeName, location)
    .then(place => res.json(place))
    .catch(e => {console.log(e); res.status(500).send('The was an error in finding the place')});
});

app.listen(port, () => console.log('Listening on port ' + port));