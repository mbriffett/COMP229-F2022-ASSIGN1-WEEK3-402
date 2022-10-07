// Third party modules 
import express from "express";
//middleware to extend express
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";

// ES Modules fix for __dirname 
import path, {dirname} from 'path'; 
import { fileURLToPath } from 'url'; 
const __dirname = dirname(fileURLToPath(import.meta.url)); //directory name

// instantiate app-server
const app = express();

//setup ViewEngine EJS - previously installed (all modules in node_modules)
app.set('views', path.join(__dirname, '/views')); //views in [directoryname]/views
app.set('view engine', 'ejs'); //tells express which view engine to use

app.use(logger('dev')); //logger (morgan) used in dev environment
app.use(express.json());
app.use(express.urlencoded({extended: false})); //ensures no environment specific encoding causes errors with express
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public'))); //serves static files (files on host machine to be used/executed there)
app.use(session({
    secret: "BigSecret", //for encrypting session values 
    saveUninitialized: "false", //these lines mean session is lost on reload
    resave: "false"
}))

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