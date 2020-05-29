const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
      type: Boolean,
      required: true
    },
    bookmarks:{
        type: Array,
        required: true
    }
});

const userCollection = mongoose.model('users', userSchema);

const Users = {
    createUser: function(newUser){
        return userCollection
            .create(newUser)
            .then(createdUser => {
                return createdUser;
            })
            .catch( err => {
                console.log(err);
                return err;
            });
    },
    getUser: function(userName){
        return userCollection
            .findOne({userName: userName})
            .then(user => {
                return user;
            })
            .catch( err => {
                return err;
            });
    },
    updateUser: function(idFind, changes){
        return userCollection
            .update({userName: idFind}, {$set:changes})
            .then(updatedUser => {
                return updatedUser;
            })
            .catch( err => {
                return err;
            });
    }
};

module.exports = {Users};