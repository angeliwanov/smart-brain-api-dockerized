const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const morgan = require('morgan');
const auth = require('./controllers/authorization')

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

console.log('Hello');
app.get('/', (req, res) => {
    res.send('success')
})

app.post('/signin', (req, res) => {signin.signInAuthentication(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileUpdate(req, res, db)})
app.put('/image', auth.requireAuth, (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', auth.requireAuth, (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 8000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});
 