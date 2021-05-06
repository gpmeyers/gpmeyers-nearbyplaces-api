require('dotenv').config();
const { Pool } = require('pg');

let host = process.env.host;
let database = process.env.database;
let port = process.env.port;
let username = process.env.mydbusername;
let password = process.env.password;

let connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl: {rejectUnauthorized: false}
};

const pool = new Pool(connection);

let savePlace = (name, placelocation) => {
    return pool.query('insert into mynearbyplaces.places(name, placelocation) values ($1, $2);', [name, placelocation])
    .then(() => {console.log('the place was saved')});
}

let getPlaces = () => {
    let sql = 'select name, placelocation from mynearbyplaces.places;';
    return pool.query(sql)
    .then(result => result.rows);
}

let saveReview = (placeName, review) => {
    let sql = 'select id from mynearbyplaces.places where (name=$s1);';
    let placeId = pool.query(sql, [placeName])
    .then(result => result.rows[0].id);

    return pool.query('insert into mynearbyplaces.reviews(placeid, review) values ($1, $2);', [placeId, review])
    .then(() => {console.log('the review was saved')});
}

let findPlace = (name, placelocation) => {
    let pattern1 = '%' + name + '%';
    let pattern2 = '%' + placelocation + '%';
    let sql = 'select name, placelocation from mynearbyplaces.places where (name like $1) and (placelocation like $2);';
    return pool.query(sql, [pattern1, pattern2])
    .then(result => result.rows);
}

module.exports = { savePlace, getPlaces, saveReview, findPlace }