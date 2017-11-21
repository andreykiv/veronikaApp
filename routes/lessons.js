var express     = require("express");
var router      = express.Router();
var Lesson  = require("../models/lesson");


// INDEX - show all campgrounds
router.get("/", function(req, res){
        // GET ALL CAMPGROUNDS FROM DB
        Lesson.find({}, function(err, allLessons){
            if(err){
                console.log(err);
            } else {
                res.render('lessons/index', {lessons: allLessons});
            }
        });
    });

// CREATE - add new campground to DB
router.post("/",  function(req, res){
    // get data from form and add to campgrounds array.
    var name = req.body.name;
    var body = req.body.body;
    var newLesson = {name: name, body: body};
    // Create a new CampGround and save to DB
    Lesson.create(newLesson, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            // redirect back to campgrounds page
            res.redirect("/lessons");
        }
    });
});

// NEW - show form to create campground
router.get("/new", function(req, res){
    res.render("lessons/new");
});

// SHOW - shows more info about one campground
// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    // find campground with the provided ID
    Lesson.findById(req.params.id, function(err, foundLesson){
        if(err){
            console.log(err);
        } else {
            // render show template with that campground
            res.render('lessons/show', {lesson: foundLesson});
        }
    });
});

// // EDIT CAMPGROUND ROUTE
// router.get("/:id/edit", function(req, res){
//     Lesson.findById(req.params.id, function(err, foundLesson){
//         res.render("lessons/edit", {lesson: foundLesson});
//     });
// });

// UPDATE CAMPGROUND ROUTE
// router.put("/:id", function(req, res){
//     // find and update the correct campground
//     Lesson.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//         if(err){
//             res.redirect("/campgrounds");
//         } else {
//             // redirect somewhere
//             res.redirect("/campgrounds/" + req.params.id);
//         }
//     } );
// });

// DESTROY CAMPGROUND ROUTE
// router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/campgrounds");
//         } else {
//             res.redirect("/campgrounds");
//         }
//     });
// });



module.exports = router;