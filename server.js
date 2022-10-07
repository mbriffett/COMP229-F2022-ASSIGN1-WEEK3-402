// Third party modules
import Express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";

// instantiate app-server
const app = Express();

// custom middleware
function helloWorld(req, res, next){
    res.setHeader('Content-Type','text/plain');
    res.end('Hello World');
};

// custom middleware
function byeWorld(req, res, next){
    res.setHeader('Content-Type','text/plain');
    res.end('Good Bye World');
};

// add middleware to express application
app.use('/hello',helloWorld);
app.use('/bye', byeWorld);
app.use('/', helloWorld);

// run app
app.listen(3000);

console.log('Server running at http://localhost:3000');