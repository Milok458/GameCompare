const express = require( 'express' );
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const uuid = require('uuid');
const mongoose = require('mongoose');
const keyChecker = require('./middleware/keyChecker');
const {Users} = require('./models/userModel');
const {Games} = require('./models/gameModel');
const {Comments} = require('./models/commentModel');
const {DATABASE_URL, PORT} = require( './config' );

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(keyChecker);

app.post('/user', jsonParser, ( req, res ) => {
    console.log( "Body ", req.body );

    let userName = req.body.userName;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let password = req.body.password;
    let isAdmin = req.body.isAdmin;

    if(!userName || !firstName || !lastName || !password || isAdmin === undefined){
        res.statusMessage = "One or more of these parameters is missing in the request!";
        return res.status(406).end();
    }

    let newUser = {
        userName : userName,
        firstName : firstName,
        lastName : lastName,
        password : password,
        isAdmin: isAdmin,
        bookmarks: []
    };

    Users
        .createUser(newUser)
        .then(result => {
            if(result.errmsg){
                res.statusMessage = "The 'username' is already in use!";
                return res.status( 409 ).end();
            }
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.patch('/user', jsonParser, ( req, res ) => {
    let idB = req.body.userName;

    if(!idB){
        res.statusMessage = "The 'username' was not found in the body!";
        return res.status(406).end();
    }

    Users
        .updateUser(idB, req.body)
        .then(result => {
            if(result.n === 0){
                res.statusMessage = "That 'username' was not found in the list of users.";
                return res.status(404).end();
            }
            return res.status(202).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.get('/users/:username', (req, res) => {
    let id = req.params.username;

    if(!id){
        res.statusMessage = "Username was not sent as parameter!";
        return res.status(406).end();
    }

    Users
        .getUser(id)
        .then(result => {
            if(result.length === 0){
                res.statusMessage = "Username not found!";
                return res.status(404).end();
            }
            else return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.post('/game', jsonParser, ( req, res ) => {
    console.log( "Body ", req.body );

    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let metacriticRating = req.body.metacriticRating;
    let gameStopRating = req.body.gameStopRating;
    let gamesRadarRating = req.body.gamesRadarRating;
    let price = req.body.price;
    let year = req.body.year;
    let category = req.body.category;
    let genre = req.body.genre;
    let image = req.body.image;
    let studio = req.body.studio;

    if(!title || !description || !url || !metacriticRating || !gameStopRating || !gamesRadarRating
        || !price || !year || !category || !genre || !image || !studio){
        res.statusMessage = "One or more of these parameters is missing in the request!";
        return res.status(406).end();
    }

    let newGame = {
        id: uuid.v4(),
        title : title,
        description : description,
        url : url,
        metacriticRating : metacriticRating,
        gameStopRating: gameStopRating,
        gamesRadarRating: gamesRadarRating,
        price : price,
        year : year,
        category : category,
        genre : genre,
        image: image,
        studio: studio,
        averageRating: (metacriticRating + gamesRadarRating + gameStopRating)/3,
        comments: [],
        points: []
    };

    Games
        .createGame(newGame)
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.get('/games', (req, res) => {
    Games
        .getAllGames()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.get('/games/:id', (req, res) => {
    let id = req.params.id;

    if(!id){
        res.statusMessage = "Id was not sent as parameter!";
        return res.status(406).end();
    }

    Games
        .getGameById(id)
        .then(result => {
            if(result.length === 0){
                res.statusMessage = "Game not found!";
                return res.status(404).end();
            }
            else return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.patch('/game', jsonParser, ( req, res ) => {
    let idB = req.body.id;

    if(!idB){
        res.statusMessage = "The 'id' was not found in the body!";
        return res.status(406).end();
    }

    Games
        .updateGame(idB, req.body)
        .then(result => {
            if(result.n === 0){
                res.statusMessage = "That 'id' was not found in the list of games.";
                return res.status(404).end();
            }
            return res.status(202).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.delete('/game/:id', ( req, res ) => {

    let id = req.params.id;

    Games
        .removeGame(id)
        .then(result => {
            if(result.deletedCount === 0){
                res.statusMessage = "That 'id' was not found in the list of games.";
                return res.status(404).end();
            }
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.post('/comment', jsonParser, ( req, res ) => {
    let userName = req.body.userName;
    let gameId = req.body.gameId;
    let comment = req.body.comment;
    let gameName = req.body.gameName;

    if(!userName || !gameId || !comment || !gameName){
        res.statusMessage = "One or more of these parameters is missing in the request!";
        return res.status(406).end();
    }

    let newComment = {
        id: uuid.v4(),
        userName : userName,
        gameId : gameId,
        comment : comment,
        gameName : gameName
    };

    Comments
        .createComment(newComment)
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.get('/comments', (req, res) => {
    Comments
        .getAllComments()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.delete('/comment/:id', ( req, res ) => {

    let id = req.params.id;

    Comments
        .removeComment(id)
        .then(result => {
            if(result.deletedCount === 0){
                res.statusMessage = "That 'id' was not found in the list of comments.";
                return res.status(404).end();
            }
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later. " +
                err.message;
            return res.status(500).end();
        });
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );

    new Promise( ( resolve, reject ) => {

        const settings = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
        .catch( err => {
            console.log( err );
        });
});