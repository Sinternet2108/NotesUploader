const express = require("express");
const path = require("path");
const multer = require("multer");

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
app.use(express.static("info"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.render("index");
}); 

app.get("/view",async(req,res)=>{
    const results = await db.getDb().collection("notes").find().toArray();
    res.render("notes",{results:results});
})

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