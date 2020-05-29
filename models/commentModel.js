const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    userName:{
        type: String,
        required: true
    },
    gameId:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    gameName:{
        type: String,
        required: true
    }
});

const commentCollection = mongoose.model('comments', commentSchema);

const Comments = {
    createComment: function(newComment){
        return commentCollection
            .create(newComment)
            .then(createdComment => {
                return createdComment;
            })
            .catch( err => {
                console.log(err);
                return err;
            });
    },
    removeComment: function(idFind){
        return commentCollection
            .remove({id: idFind})
            .then(removedComment => {
                return removedComment;
            })
            .catch( err => {
                return err;
            });
    },
    getAllComments: function(){
        return commentCollection
            .find()
            .then(allComments => {
                return allComments;
            })
            .catch( err => {
                return err;
            });
    }
};

module.exports = {Comments};