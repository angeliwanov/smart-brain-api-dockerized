const jwt = require('jsonwebtoken');
const redis = require('redis');
 
const redisClient = redis.createClient(process.env.REDIS_URI)

const handleSignin = (req, res, db, bcrypt) => {
    const {name, email, password} = req.body;
    if(!email && !name) {
        return Promise.reject('incorrect form  submission');
    }
    return db.select('email', 'hash').from('login')
    .where({email: email})
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return  db.select('*').from('users')
            .where({email: email})
            .then(user => user[0])
            .catch(err => Promise.reject('user not found'))
        } else {
            Promise.reject('wrong credentials')
        }
    })
    .catch(err => Promise.reject ('wrong credentials'))
}

const getAuthTokenId = () => {
    console.log('OK')
}

const signToken = (email) => {
     const jwtPayload = {email};
     return jwt.sign(jwtPayload, 'JWT_SECRET')
}

const createSession = (user) => {
    const {email, id} = user;
    const token = signToken(email);
    return {success: 'true', userId: id, token}
}

const signInAuthentication = (req, res, db, bcrypt) => {
    const {authorization} = req.headers;
    return authorization ? 
    getAuthTokenId() : 
    handleSignin(req, res, db, bcrypt)
    .then(data => {
       return data.id && data.email ? createSession(data) :  Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err))
}

module.exports = {
    signInAuthentication: signInAuthentication
}