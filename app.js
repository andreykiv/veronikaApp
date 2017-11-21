// variables setup
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Lesson          = require("./models/lesson"),
    User            = require("./models/user");

    
// application setup
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb://localhost/veronika_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//requring routes
var lessonRoutes    = require("./routes/lessons");
var indexRoutes     = require("./routes/index");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Ukraine",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error   = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/lessons", lessonRoutes);

// function seedDB(){
//     Lesson.remove({}, function(err){
//             if(err){
//                 console.log(err);
//             }
//         console.log("removed campground!");
//         // Add a few campgrounds
//     });
// }

// seedDB();


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running...");
});