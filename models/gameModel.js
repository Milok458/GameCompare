const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    metacriticRating:{
        type: Number,
        required: true
    },
    gameStopRating:{
        type: Number,
        required: true
    },
    gamesRadarRating:{
        type: Number,
        required: true
    },
    averageRating:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});

const gameCollection = mongoose.model('games', gameSchema);

const Games = {
    createGame: function(newGame){
        return gameCollection
            .create(newGame)
            .then(createdGame => {
                return createdGame;
            })
            .catch( err => {
                return err;
            });
    },
    getAllGames: function(){
        return gameCollection
            .find()
            .then(allGames => {
                return allGames;
            })
            .catch( err => {
                return err;
            });
    },
    getGameById: function(idFind){
        return gameCollection
            .find({id: idFind})
            .then(allGames => {
                return allGames;
            })
            .catch( err => {
                return err;
            });
    },
    updateGame: function(idFind, changes){
        return gameCollection
            .update({id: idFind}, {$set:changes})
            .then(updatedGame => {
                return updatedGame;
            })
            .catch( err => {
                return err;
            });
    },
    removeGame: function(idFind){
        return gameCollection
            .remove({id: idFind})
            .then(removedGame => {
                return removedGame;
            })
            .catch( err => {
                return err;
            });
    }
};

module.exports = {Games};