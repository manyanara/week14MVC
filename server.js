const path= require('path');
const express= require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('/controllers');
// const helpers = require('./utils/helpers') only if I want to add custom helpers to handlebars

const sequelize = require('./config/connection'); 
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app= express();
const PORT = process.env.PORT || 3001;
//const hbs= exhbs.create({helpers}) only if i want to add custom helpers to handlebars

// creates session object to pass through sequelize as session parameters
const sess = {
    secret: 'Super Super Secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure:false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({db: sequelize})
};

//sets up middleware to initiate a sequelize session
app.use(session(sess));

// informs express to use handlebars as a view engine and sets name 'view engine' for handlebars
app.engine('handlebars', hbsengine);
app.set('view engine', 'handlebars');
// encodes incoming request as JSON and URL encoded data 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public'))); // serves static file in the /public folder
// points request to the /routes folder
app.use(routes);

// connects and synchronises all models and then sets express to listen at local port
sequelize.sync({force:false}.then(()=> {
    app.listen(PORT, ()=> {console.log(`Now Listening At Port: ${PORT}`)});
}))


