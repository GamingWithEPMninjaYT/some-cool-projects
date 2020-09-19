const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
  let args = message.content.split(" ").slice(1);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Manque de la permission MANAGE_MESSAGES")
 


    if(!args[0]) return message.channel.send("**Merci de mettre un nombre entre 2 et 100**")
    message.channel.bulkDelete(args[0]).then(() => {
        var nembed = new Discord.RichEmbed()
    .setColor("00F30A")
.setTitle("Clear | FulguBot")
.setDescription(`${args[0]} messages clear !`)
//addField("Aide", "//clear + nombre")

// message.channel.send(nembed);
        message.channel.send(nembed).then(msg => msg.delete(5000));
    
    })
            .catch(err => {
            message.channel.send('Erreur durant le clear | Vous en pouvez pas supprimé des messages datant de plus de 14jours/\nVous ne pouvez pas clear plus de 100 messages');
            console.log(err);
          });
      
}
module.exports.help = {
    name: "clear"
}