  const Discord = require('discord.js');
exports.run = async(bot, message, args) => {
 const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
  let tte = args.join(" ");
  var a = tte.split(",")
  
  if(!tte) return message.channel.send("**Merci de mettre deux choix à proposer**");
  
var embed = new Discord.RichEmbed()
.setTitle("Sondage | FulguBot")
.setDescription(`🅰 | ${a[0]}\n🅱 | ${a[1]}`)
.setTimestamp()
.setFooter("Réagisser avec 🅰 ou 🅱 pour prendre part au vote");
message.channel.send(embed).then(async function(message){               
                await message.react("🅰")
                await message.react("🅱")
            })
            return;
  
}
exports.help = {
  name: "sondage"
}