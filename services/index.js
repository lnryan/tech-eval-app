
process.title = "evaluation-svc";

var app = require('./app');

app.listen(process.env.port,()={
   console.log(`${process.title} listing on ${process.env.port}`)
});