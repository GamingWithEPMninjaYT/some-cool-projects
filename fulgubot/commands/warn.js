const fs = require("fs");
const db = require("../db.json");
const Discord = require("discord.js")
exports.run = async(bot, message, args) => { 
  const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
  let mod = message.guild.channels.find("name", "mod-logs");
  let warned = message.mentions.users.first()
  if(!db[warned.id]){
    db[warned.id] = {
      warn: "0"
    }
  }
  fs.writeFile("./db.json", JSON.stringify(db), (err) => {
    if(err) console.log(err);
  })
  let userwarn = db[warned.id].warn
 db[warned.id].warn++
  message.channel.send("**Utilisateur warn avec succès**")
  var embed = new Discord.RichEmbed()
  .setTitle("Warn | FulguBot")
  .addField("Utilisateur Warn", warned.username)
  .addField("Auteur", message.author.username)
  .addField("Channel", message.channel)
  .addField("Nombre de warn", db[warned.id].warn)
  .setTimestamp()
  mod.send(embed)
}
exports.help = {
  name: "warn"
}