//npm i express body-parser mongoose@5.13.9 mongoose-unique-validator bcrypt multer axios
//$ npm install jsonwebtoken@8.5.1


// import express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");

// import axios module
const axios = require("axios");

// import bcrypt module
const bcrypt = require("bcrypt");

// import multer module
const multer = require("multer");

// import jsonwebtoken module
const jwt = require("jsonwebtoken");

// import authenticate module
const authenticate = require("./middelware/authenticate");

// import path module
const path = require("path");

// import mongoose module
const mongoose = require('mongoose');
//sportFekriDB DB name et creation auto avec .connect
mongoose.connect('mongodb://127.0.0.1:27017/sportFekriDB');

//creation express application
const app = express();

//configure body-parser
// send json responses
// .USE pour la configuration de l'app
app.use(bodyParser.json());
//get objects from requests
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//avatars est un raccourcie => short cut
//backend/images => original path
app.use('/avatars', express.static(path.join('backend/images')))

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },


    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

//*************MODELS IMPORTATION**************/

//import match model
const Match = require("./models/match");

//import player model
const Player = require("./models/player");

//import user model
const User = require("./models/user");

//import team model
const Team = require("./models/team");



//simulation DB

let matchesTab = [
    { id: 1, scoreOne: 2, scoreTwo: 1, teamOne: "FCB", teamTwo: "RMA" },
    { id: 2, scoreOne: 0, scoreTwo: 1, teamOne: "CA", teamTwo: "EST" },
    { id: 3, scoreOne: 1, scoreTwo: 1, teamOne: "DOR", teamTwo: "ATM" },
]


// buisness logique de addMatch(obj)
app.post("/matches", (req, res) => {
    console.log("HERE BL: ADD match");
    //save in DB
    // create match var (type Match)=> var will be saved into matches
    let match = new Match({
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo
    });
    console.log("HERE MATCH", match);
    // send match to DB => .save methode predefinie mongoose
    match.save();
    //retour obligatoire du reponse
    res.json({ message: "added with success", isAdded: true });
});



// buisness logique de getAllMatches()
app.get("/matches", authenticate, (req, res) => {
    console.log("HERE BL: GET ALL match");
    Match.find().then((data) => {
        res.json({ matches: data, message: "OK" });
    })

});


// buisness logique de editMatch(newobj)
app.put("/matches", (req, res) => {
    console.log("HERE BL: EDIT match");
    let newMatch = req.body;
    Match.updateOne({ _id: newMatch._id }, newMatch).then(
        (editResponce) => {
            console.log("editResponce", editResponce);
            if (editResponce.nModified == 1) {
                res.json({ message: "match edited with success" });
            }

        }
    )
    //

});


// buisness logique de getMatchById(id)
app.get("/matches/:id", (req, res) => {
    console.log("here into get match by id");
    //req.param.x pour recuperer un variable d'une adresse
    let id = req.params.id;
    Match.findOne({ _id: id }).then(
        (doc) => {
            res.json({ findedMatch: doc });
        });

    // let match={};
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id==id) {
    //         match=matchesTab[i];
    //         break;
    //     }
    // }
    // res.json({findedMatch : match, message:"OK"});

});


// buisness logique de deleteMatchById(id)
app.delete("/matches/:id", (req, res) => {
    let id = req.params.id;
    for (let i = 0; i < matchesTab.length; i++) {
        if (matchesTab[i].id == id) {
            matchesTab.splice(i, 1);
            break;
        }
    }
    res.json({ message: `Match n° ${id} is deleted` });
});





// buisness logique de addPlayer(player)
app.post("/players", (req, res) => {
    console.log("HERE BL: ADD player", req.body);
    //save in DB
    // create player var (type Player)=> var will be saved into players
    let player = new Player({
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        number: req.body.number
    });
    console.log("HERE Player", player);
    // send player to DB => .save methode predefinie mongoose
    player.save();
    //retour obligatoire du reponse
    res.json({ message: "added with success", isAdded: true });
});


// buisness logique de getAllPlayer()
app.get("/players", (req, res) => {
    console.log("HERE BL: get all players");
    Player.find().then((doc) =>
        res.json({ players: doc }));
});


// buisness logique de editPlayer(player)
app.put("/players", (req, res) => {
    console.log("HERE BL: edit player");
});


// buisness logique de getPlayerById(id)
app.get("/players/:id", (req, res) => {
    console.log("here into get player by id", req.params.id);
    //req.param.x pour recuperer un variable d'une adresse
    let id = req.params.id;
    Player.findOne({ _id: id }).then(
        (doc) => {
            res.json({ findedPlayer: doc });
        });
});


// buisness logique de deleteMatchById(id)
app.delete("/players/:id", (req, res) => {
    console.log("HERE BL: delete player");
});










// BL search matches
app.post("/matches/search", (req, res) => {
    console.log("HERE into search", req.body);
    let findedMatches = [];
    for (let i = 0; i < matchesTab.length; i++) {
        if (matchesTab[i].scoreOne == req.body.scoreOne && matchesTab[i].scoreTwo == req.body.scoreTwo) {
            findedMatches.push(matchesTab[i]);
        }
    }
    res.json({ matches: findedMatches });
});





// buisness logique signUp
app.post("/allUsers/subscription", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("here into signUp", req.body);
    bcrypt.hash(req.body.pwd, 8).then(
        (cryptedPwd) => {
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: cryptedPwd,
                role: req.body.role,
                avatar: `http://localhost:3000/avatars/${req.file.filename}`,
            });
            user.save((error, doc) => {
                console.log("HERE ERROR", error);
                console.log("HERE DOC", doc);
                if (doc) {
                    res.json({ message: "User added with success" });
                } else {
                    res.json({ message: "Error" });
                }
            });

        }
    )
});


// BL login
app.post("/allUsers/signin", (req, res) => {
    let user = req.body;
    let findedUser;
    // 0 : check email
    // 1 : check pwd
    // 2 : welcome
    User.findOne({ email: user.email }).then(
        (doc) => {
            findedUser = doc;
            if (!doc) {
                res.json({ message: "0" });
            }
            return bcrypt.compare(user.pwd, doc.pwd);
        }).then(
            (pwdResult) => {
                if (!pwdResult) {
                    res.json({ message: "1" });
                } else {
                    const token = jwt.sign(
                        {
                            email: findedUser.email,
                            userId: findedUser._id,
                            userRole: findedUser.role,
                        },
                        "Testing",
                        { expiresIn: "1min" }
                    );

                    let userToSend = {
                        id: findedUser._id,
                        firstName: findedUser.firstName,
                        lastName: findedUser.lastName,
                        role: findedUser.role,
                        jwt: token,
                        expiresIn: 60,
                    };

                    res.json({ message: "2", user: userToSend });
                }
            }
        );

});


// buisness logique de editProfile(newUser)
app.post("/users", (req, res) => {
    console.log("HERE BL: edit profile");
});


//BL addTeam()
app.post("/teams", (req, res) => {
    console.log("HERE BL: add Team", req.body);
    let teamObject = new Team({
        teamName: req.body.name,
        teamOwner: req.body.owner,
        teamStadium: req.body.stadium,
        teamFoundation: req.body.foundation
    });
    teamObject.save((err, doc) => {
        // if (err) {
        //     res.json({message : "NOT OK"});
        // } else {
        //     res.json({message : "OK"});
        // }
        err ? res.json({ message: "NOT OK" }) : res.json({ message: "OK" });
    });
});


// buisness logique de getAllTeams()
app.get("/teams", (req, res) => {
    console.log("HERE BL: get all teams", req.body);
    Team.find().then((doc) =>
        res.json({ teams: doc }));
});




// buisness logique de deleteById() team
app.delete("/teams/:id", (req, res) => {
    let teamId = req.params.id;
    console.log("HERE BL: delete team", teamId);
    Team.deleteOne({ _id: teamId }).then(
        (deleteResponce) => {
            console.log("deleteResponce", deleteResponce);
            if (deleteResponce.deletedCount == 1) {
                res.json({ message: "deleted with success" });
            }

        }
    )



});

// buisness logique de getTeamById(id)
app.get("/teams/:id", (req, res) => {
    console.log("here into get team by id");
    //req.param.x pour recuperer un variable d'une adresse
    let id = req.params.id;
    Team.findOne({ _id: id }).then(
        (doc) => {
            res.json({ findedTeam: doc });
        });


});



// BL search weather

app.post("/weather", (req, res) => {
    console.log("here BL:search weather", req.body);
    let city = req.body.city;
    let key = "62ee756a34835483299877a61961cafb";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    axios.get(apiURL).then(
        (apiResponse) => {
            console.log("here apiResponse", apiResponse.data);

            let result = {
                temperature: apiResponse.data.main.temp,
                pressure: apiResponse.data.main.pressure,
                humidity: apiResponse.data.main.humidity,
                sunrise: apiResponse.data.sys.sunrise,
                sunset: apiResponse.data.sys.sunset,
                icone: `http://openweathermap.org/img/w/${apiResponse.data.weather[0].icon}.png`,
            };
            res.json({ apiResult: result });

        }
    )

});








//make app importable from another files, must be last line
module.exports = app;

