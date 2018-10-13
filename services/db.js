const OrientDBClient = require('orientjs').OrientDBClient;

const client = new OrientDBClient({
    host: process.env.db_endpoint,
    pool: {
        max: 10
    }
});

class DB {
    constructor(app){
        const bootstrap = (pool) => {
            app.use((req, res, next)) => {
                pool.acquire().then((session) => {
                    res.locals.db = session;
                    res.on("finish"),()=>{ session.close(); });
                    next();
                })
                .catch(err=>{ res.status(500).send(err); });
            }
        }
    }
}
var db = {};
db.session = (database="evaluations") => {

    client.connect({
        host: process.env.db_endpoint,
        port: 2424
    }).then(client => {
        //returns a promise, use db.then()
        return client.session({ name: "evaluations", username: process.env.db_user, password: process.env.db_pass });
    });
};
db.close = ()=>{ client.close(); }
module.exports = DB;

