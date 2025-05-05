// /////////////////////////////////
// library imports
// /////////////////////////////////
const express = require('express')
const parser = require('body-parser')
const multer = require('multer')
const nedb = require("@seald-io/nedb")

// /////////////////////////////////
// importing new cookie library
// /////////////////////////////////
const cookieParser = require("cookie-parser");

// /////////////////////////////////
// importing new authentication libraries
// /////////////////////////////////
const expressSession = require('express-session')
const nedbSessionStore = require('nedb-promises-session-store')
const bcrypt = require('bcrypt')

// /////////////////////////////////
// app setting
// /////////////////////////////////
const app = express()
const encodedParser = parser.urlencoded({extended: true})
const uploadProcessor = multer({dest: "public/upload"})

app.use(express.static('public')) 
app.use(express.json()); // This is critical for parsing JSON body!
app.use(encodedParser)
app.set("view engine", "ejs")

let restaurantPosts = []
let recipePosts = []

// /////////////////////////////////
// tell the app to use the new cookie parser
// /////////////////////////////////
app.use(cookieParser());

// /////////////////////////////////
// setting up middleware libraries for auth
// /////////////////////////////////
const nedbSessionInit = nedbSessionStore({
    connect: expressSession,
    filename: 'sessions.txt'
})
app.use(expressSession({
    store: nedbSessionInit,
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000
    },
    secret: 'supersecret123'
}))

app.use((req, res, next) => {
    res.locals.loggedInUser = req.session.loggedInUser;
    next();
});  

let userdb = new nedb({
    filename: 'userdb.txt',
    autoload: true
})

// /////////////////////////////////
// routes
// /////////////////////////////////
app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/message", (req, res) => {
    res.render("message.ejs");
});

app.get("/form", (req, res) => {
    res.render("form.ejs");
});

app.get('/restaurant', (req, res)=>{
    res.render('restaurant.ejs', { resPosts: restaurantPosts })
})

app.get("/recipe", (req, res) => {
    res.render("recipe.ejs", { recPosts: recipePosts }); 
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    // if user not found, reload login page
    userdb.findOne({username}, (err, user) =>{
        if (!user) {
            return res.redirect('/login');
        }

        const passwordMatches = bcrypt.compareSync(password, user.password);
        if (passwordMatches){ // if login successful, take them to the form page 
            req.session.loggedInUser = user.username;
            res.redirect('/form');
        } else { //  if password not matched, reload login page 
            res.redirect('/login');
        }
    })
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.redirect('/register?err=missingFields');
    }

    userdb.findOne({ username }, (err, user) => {
        if (err) {
            console.error("DB error during lookup:", err);
            return res.redirect('/register?err=db');
        }

        if (user) {
            // User already exists
            return res.redirect('/login');
        }

        // Hash and insert new user
        const hashedPassword = bcrypt.hashSync(password, 10);
        userdb.insert({ username, password: hashedPassword }, (err, newUser) => {
            if (err) {
                console.error('Registration error:', err);
                return res.redirect('/register?err=db');
            }

            console.log("New user registered:", newUser.username);
            res.redirect('/login');
        });
    });
});


app.get('/logout', (req, res) => {
    delete req.session.loggedInUser;
    res.redirect('/');
});

app.post('/submit', uploadProcessor.single("photo"), (req, res)=>{

    let post = {
        date: new Date().toLocaleDateString("en-US", { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        dish: req.body.dish,
        review: req.body.review,
        url: req.body.link,
        category: req.body.category, 
    	flavors: req.body.flavor || [], // array of flavors used selected
        other: req.body.other,
        isOtherChecked: req.body.isOtherChecked,
        rating: req.body.rating 
    }   
    if(req.file){
        post.imgUrl = "upload/" + req.file.filename
    }
    if (post.isOtherChecked === 'on'){
        post.other = ' #' + post.other
    }

    // Check whether it's a restaurant or recipe post
	if (post.category === "Restaurant") {
    	restaurantPosts.unshift(post);
	} else if (post.category === "Recipe") {
    	recipePosts.unshift(post);
	}

    res.redirect('/message')
})


app.get('/allpostsinjson', (req, res)=>{
    let jsonDataFormat = JSON.stringify(totalPosts)
    res.json(jsonDataFormat)
})
// /////////////////////////////////
// listen 
// /////////////////////////////////
app.listen(4321, ()=>{
    console.log('server is live at http://127.0.0.1:4321')
})