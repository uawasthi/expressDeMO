// JavaScript source code
var mongoose = require("mongoose");
var mongoDB = 'mongodb://127.0.0.1/userdb';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

var Schema = mongoose.Schema;

// creating a schema
var userSchema = new Schema({
    userName: {unique :true,type :String,required:true,},
    password: String,
    profile: String
});
// creating a model
var User = mongoose.model("User", userSchema);

// creating new user
function createUser(myUser) {
    var newUser = new User({
        userName: myUser.name,
        password: myUser.password,
        profile: myUser.profile
    });
    newUser.save(function (error) {
        console.log("connection successful");
        console.log("Your user has been saved!");
        if (error) {
            console.error("this is an error : "+error);
        }
    });
}
// removing user
function removeUser(unam) {
    User.find({ userName: unam }).remove().exec();
    console.log(unam + " Deleted sucessfully!")
}
/* function findUser(unam,callback) {
    User.find({ userName: unam },callback())
    console.log(unam + " Deleted sucessfully!")
} */

// exporting  modules
exports.createUser = createUser;
exports.removeUser = removeUser;
exports.User = User;
