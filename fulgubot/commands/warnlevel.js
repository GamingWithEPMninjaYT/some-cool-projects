
const Discord = require("discord.js");
const fs = require("fs")
const db = require("../db.json")
exports.run = async (bot, message) => {
   const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
  let mentioned = message.mentions.users.first()
  if(!db[mentioned.id]){
    db[mentioned.id] = {
      warn: "0"
    }
  }
  fs.writeFile("./db.json", JSON.stringify(db), (err) => {
    if (err) console.log (err)
  
  })
  let warnss = db[mentioned.id].warn
  var embed = new Discord.RichEmbed()
  .setTitle("WarnLevel | FulguBot")
  .addField("Utilisateur Check", mentioned.username)
  .addField("Nombre de warn", warnss)
  .setTimestamp()
  message.channel.send(embed)
}
exports.help = {
  name: "warnlevel"
}