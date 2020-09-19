const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")

module.exports.run = async (bot, message, args) => {
const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
  let member = message.mentions.users.first() || message.author;
let userembed = new Discord.RichEmbed()
.setColor('#36393e')
.setThumbnail(member.displayAvatarURL)

.setTitle(`User Info Commande | FulguBot`)
.addField("Pseudo","``" +member.username+"``", true)

.addField("Compte crée le" + ` (${moment(member.createdAt, "dd").fromNow()})`, "``" + `${moment.utc(member.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}` + "``", false)

 .addField("Rejoins le", "``" + `${moment.utc(message.member.joinedAt).format("LL")}` + "``")

.addField("ID", "``" + member.id + "``", true)
/*addField("Bot", "``" + member.bot + "``" ? "``Oui``" : "``Non``", true)*/
.addField("Status", message.guild.member(member).presence.game ? message.guild.member(member).presence.game.name  : "``Ne joue à rien``" , true)
/*.addField("Dernier message", "``" + member.lastMessage + "``" , true)*/
.addField("Rôle le plus haut",  message.guild.member(member).highestRole, true)

.addField("Rôles",message.guild.member(member).roles.map(s => s).join(" | ", true))
.setFooter(`FulguBot ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
     
message.channel.send(userembed)
}
module.exports.help = {
    name: "userinfo"
}
