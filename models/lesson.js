var mongoose = require("mongoose");

var lessonSchema = new mongoose.Schema({
    name: String,
    body: String
});

var Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;