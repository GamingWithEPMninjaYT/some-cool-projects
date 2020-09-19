const lvl = require("../levels.json")
const Discord = require("discord.js")
exports.run = async(bot, message, args) => {
  
  var embed = new Discord.RichEmbed()
  .setColor("#000")
  .setTitle("Voici votre profile")
  .addField("Level", lvl[message.author.id].level)
  .addField("Messages", lvl[message.author.id].messages)
  .addField("Xp", lvl[message.author.id].xp)
  .addField("Prochain level up dans", lvl[message.author.id].nxtlevel - lvl[message.author.id].xp)
  .addField("Vous gagnez actuellement", lvl[message.author.id].curamnt)
  message.channel.send(embed)
}
exports.help = {
  name: "profile"
}