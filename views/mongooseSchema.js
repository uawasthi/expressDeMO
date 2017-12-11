var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//example 3
var firstSchema = new Schema({
    name : String,
    project : String,
    contactInfo :[{ type: String }],
    createdOn :{ type:Date , default:Date.now}
});
// example2
var noIdSchema = new Schema ({name : String},{_id :false});

// by adding fields with add method
var secondSchema = new Schema;
secondSchema.add({name : String},{project:String});

// example 3 conditional schemas
 var includeMiddleName = true;
 if(includeMiddleName ){
    mySchema.add({
        name : {first:String,
                 middle : String,
                 last: String    
        }},
        {projecst:String})

 }else {
mySchema.add(
    {name : String},
    {project:String}
    
)}

// defining collection name
var firstSchema = new Schema({
    name : String,
    project : String,
    createdOn :{ type:Date , default:Date.now}
},{ collection: 'myEmp' });


// creating model
var  firstModel = mongoose.model('Employee', firstSchema);
//name of the model = Employee which is an object of firstSchema type
// mongoose creates a Collection  with the default name as plural of the model name 
//e.g. Employees in this case

var  firstModel = mongoose.model('Employee', firstSchema,'myEmp');

// adding values to models
var emp = new firstModel({
    name :"mongo",
    project :"myProj"
});
emp.save();