const bd = require("../bd.json");
const Discord = require("discord.js");
const fs = require("fs")

exports.run = async (bot, message, args) => {
   const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
  let tte = args.join(" ");
  if(!tte) return message.channel.send("**Merci de mettre le texte à envoyer en MP");
  
  if(!bd[message.guild.id]) {
    bd[message.guild.id] = {
      bvn: "bienvenue"
    }
  }
  fs.writeFile("./db.json", JSON.stringify(bd), (err) =>{
    if(err) console.log(err)
  })
   bd[message.guild.id] = {
      bvn: tte
    
  }
  fs.writeFile("./db.json", JSON.stringify(bd), (err) =>{
    if(err) console.log(err)
  })
  var m = new Discord.RichEmbed()
  .addField("Message bienvenue changé avec succès :", `Nouveau message : ${tte}`)
  message.channel.send(m)
}
            exports.help = {
              name: "setdmbvn"
            }
              
               