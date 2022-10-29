const handleProfileGet = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({id: id})
    .then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json("not found");
        }   
    })
    .catch(err => res.status(400).json('user not found'))    
}

const handleProfileUpdate = (req, res, db) => {
    const {id} = req.params;
    const {name, age, pet} = req.body.formInput;
    db('users')
    .where({id})
    .update({name: name})
    .then(resp => {
         if(resp) {
            res.json("success")
         }else {
            res.status(400).json('unable to update')
         }
    })
    .catch(err => res.status(400).json('error updating users '))
}

module.exports = {
    handleProfileGet: handleProfileGet,
    handleProfileUpdate: handleProfileUpdate
}