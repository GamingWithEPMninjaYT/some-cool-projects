const express = require("express");
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const ejs = require("ejs")
const path = require("path")
const file = require("./models/model.js")
app.use(express.static('css'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.listen(process.env.PORT, () => {
  console.log("Serveur prêt")
})


app.get("/", function(req, res, next) {
  file.find({type: "Mathématiques"}, (err, maths) => {
          file.find({type: "NSI"}, (err, nsi) => {       
               file.find({type: "Anglais"}, (err, anglais) => {
                   file.find({type: "Physique-Chimie"}, (err, pc) => {
                    
  res.render(__dirname + "/index.ejs", {
    maths: maths,
    nsi: nsi,
    anglais: anglais,
    pc: pc
  })
                     })
                 })
            })
    })
  
})

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(res => {
    console.log("DB Connected!");
  })
  .catch(err => {
    console.log(Error, err.message);
  });


app.post("/request", function(req, res) {
  let author = req.body.author;
  if(!author) return res.send("Manque de l'auteur")
  let title = req.body.title;
  if(!title) return res.send("Manque du titre")
  let content = req.body.content;
   if(!content) return res.send("Manque du contenu")
  let type = req.body.type;
   if(!type) return res.send("Manque de la matière")
  
  file.findOne({title: title}, (err, doc) => {
    if(!doc) {
      const proc = new file({
    title: title,
    author: author,
    content: content,
    type: type
  })
  proc.save()
    }else {
      return res.send("Existe déjà.")
    }
  })
  
  
  res.send("Votre demande a été enregistré avec succès ! (vous pouvez quitter cette page)")
})
