const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.render("index");
}); 

app.get("/upload",(req,res)=>{
    res.render("upload");
});

app.post("/upload",(req,res)=>{

    const Notes = {
        department: req.body.department,
        semester: req.body.semester,
        subject: req.body.subject,
        module: req.body.module,
        /*notes: [
            {
                notesName: req.file,
                subject: req.body.subject
            }
        ]*/
    }

    console.log(Notes);
    
    res.redirect("/upload");
});

app.listen(3000);