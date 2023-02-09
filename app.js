const express = require("express");
const path = require("path");
const multer = require("multer");
const bson = require("bson");
const session = require("express-session");
const mongodbsession = require("connect-mongodb-session");
const mongodbstore = mongodbsession(session);

const mongo = new mongodbstore({
    uri:"mongodb://127.0.0.1:27017",
    databaseName: "UploadWebApp",
    collection: "session"
});

const db = require("./data/database");

const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"notes");
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
});

const upload = multer({storage: fileStorage});

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use("/notes",express.static("notes"));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: "super-secret",
    store: mongo
}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",async(req,res)=>{

    try{
        const existingFaculty = await db.getDb().collection("faculty").findOne({_id: req.session.user.id});

        const data = req.session.isAuthenticated;

        res.render("index",{data:data});
    }    
    catch(err)
    {
        if(err instanceof bson.BSONVersionError)
        {
            console.log("Bson Error");
        }
    }
    
}); 

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async (req,res)=>{
    
    const password = "123";

    const user = {
        usergmail: req.body.gmail,
        userpassword: req.body.password,
    }

    const faculty = await db.getDb().collection("faculty").findOne({gmail:user.usergmail});

    if(!faculty || user.userpassword !== password)
    {
        return res.redirect("/");
    }

    req.session.user ={
        id: faculty._id,
        name: faculty.name,
        gmail: faculty.gmail,
        dept: faculty.department       
    }
    req.session.isAuthenticated = true;
    req.session.save(
        res.redirect("/upload")
    )    
});

app.get("/view",async(req,res)=>{
    const results = await db.getDb().collection("notes").find().toArray();
    res.render("notes",{results:results});
});

app.get("/upload",async (req,res)=>{

    res.render("upload");
});

app.post("/upload",upload.single("user-file"),async (req,res)=>{  

    const Notes = {
        department : req.body.department,
        semester : req.body.semester,
        subject : req.body.subject,
        module : req.body.module,
        path: req.file.path
    }

    console.log(Notes.path);

    const result = await db.getDb().collection("notes").insertOne(Notes);

    res.redirect("/view");
});

db.getConnection().then(
    app.listen(3000)
);