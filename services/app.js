const OrientDBClient = require("orientjs").OrientDBClient;
const defaults = {
    host:'localhost',
    user:'admin',
    pass:'admin',
    name:'evaluations'
}
var db = { config : { defaults:[] }, session:null, status:null };
Object.keys(defaults).forEach((k)=>{
    if(process.env.hasOwnProperty(`db_${k}`)){
        db.config[k] = process.env[`db_${k}`]
    } else {
      db.config[k]=defaults[k];
      db.config.defaults.push(k);
    }
});

//TODO refactor as Functional [].forEach.any()
if(db.config.defaults.length>0) {
    console.warn(
        'not all db connection details were supplied. Using defaults where missing',db.config.defaults
    )
}

const client = new OrientDBClient({
    host: db.config.host,
    pool: {
        max: 10
    }
});

var express = require('express');
var app = express();
app.set('db',db);
//OrientDB wrapper. don't like it but don't have time to refactor
//from here: https://github.com/orientechnologies/orientjs-example/blob/master/orientjs-chat-example/index.js
const boostrap = pool => {
    app.use((req, res, next) => {
        pool
        .acquire()
        .then(session => {
            db.session = res.locals.db = session;
            db.status = 'open';
            res.on("finish", () => {
                session.close();
            });
            next();
        })
        .catch(err => {
                res.status(500).send(err);
        });
    });

    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/index.html");
    });
    /*
    app.get("/messages", function(req, res) {
        res.locals.db
            .query("select from Room order by date limit 20")
            .all()
            .then(messages => { res.send(messages); })
            .catch(err => { res.status(500).send(err); });
    });
    */
};

//{ name: "demodb", username: "admin", password: "admin" }
client
    .connect()
    .then(() => {
        return client.sessions({
            name: db.config.name,
            username: db.config.user,
            password: db.config.pass,
            pool: {
                max: 25
            }
        });
    })
    .then(pool => {
        boostrap(pool);
    })
    .catch(err => {
        app.set('db.status','error');
        console.error(err);
    });

module.exports = app;