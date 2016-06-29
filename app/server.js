var express =   require("express");
var multer  =   require('multer');
var app     =   express();
var fs     =   require('fs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "accept, cache-control, content-type, x-requested-with");
    next();
});


var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        var directory = './uploads/' +  req.body.name;
        checkDirectorySync(directory)
        callback(null, directory);

    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname );
    }
});
var upload = multer({ storage : storage}).any();

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){

    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        console.log("File is upload");
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});

function checkDirectorySync(directory) {
    try {
        fs.statSync(directory);
    } catch(e) {
        fs.mkdirSync(directory);
    }
}