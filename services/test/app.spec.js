const {expect} = require('chai')
const proxyquire = require('proxyquire').noPreserveCache()
const envs = process.env;

describe("App start up",()=>{
    var app = require('../app')
    it("should be able to get app",()=>{
        expect(app).to.not.be.undefined;
    });

});

describe("Database settings should be checked on startup",()=>{
    it("Should use `db_host` from environment when present and `localhost` when not",()=>{
//        sinon.stub(process.env,'db_host').value('somehost');
        app = require('../app');
        db = app.get('db');
        expect(db.config.host).to.equal('localhost');

        process.env.db_host = 'somehost';
        app = proxyquire('../app',{});
        db = app.get('db');
        expect(db.config.host).to.equal(process.env.db_host);
    });

    it("Should use `db_user` and `db_pass` when provided or `admin`",()=>{

        process.env.db_user = 'devver';
        process.env.db_pass = 'rocks';
        app = proxyquire('../app',{});
        db = app.get('db');
        expect(db.config.user).to.equal('devver');
        expect(db.config.pass).to.equal('rocks');

        delete process.env.db_user;
        delete process.env.db_pass;
        app = proxyquire('../app',{});
        db = app.get('db');
        expect(db.config.user).to.equal('admin');
        expect(db.config.defaults).to.include.members(['user','pass']);

    });

    it("Should use `db_name` or 'evaluations'",()=>{
        process.env.db_name = 'posse';
        app = proxyquire('../app',{});
        db = app.get('db');
        expect(db.config.name).to.equal('posse');

        delete process.env.db_name;
        app = proxyquire('../app',{});
        db = app.get('db');
        expect(db.config.name).to.equal('evaluations');
        expect(db.config.defaults).to.include.members(['name']);
    });

    /*
    TODO integration test with test DB
     */
    afterEach(()=>{
        process.env = envs;
    });
});