// /////////////////////////////////
//  1. library imports
// /////////////////////////////////
const express = require('express')
const parser = require('body-parser')
const multer = require('multer')

// /////////////////////////////////
// 2. app setting
// /////////////////////////////////
const app = express()
const encodedParser = parser.urlencoded({extended: true})
const uploadProcessor = multer({dest: "public/upload"})

app.use(express.static('public'))   
app.use(encodedParser)
app.set("view engine", "ejs")

let restaurantPosts = []
let recipePosts = []

// /////////////////////////////////
// 3. routes
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
// 4. listen 
// /////////////////////////////////
app.listen(4121, ()=>{
    console.log('server is live at http://127.0.0.1:4121')
})