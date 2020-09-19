const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete()
  const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
//  if (!message.member.roles.some(r=>["Zed Mod Role"].includes(r.name)) ) return message.channel.send("Manque du rôle Zed Mod Role")
   if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**Vous n'avez pas la permission d'effectuer cette action**")

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
  if (!bUser) return message.channel.send("**Veuillez mentionner un utilisateur valide**")
 
  let bReason = args.join(" ").slice(1);
 
  if(!bReason) return message.channel.send("**Merci de mettre une raison valable à ce kick**")



  let banEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription("Kick | FulguBot")
  .addField("Utilisateur Kick", `${bUser} | ID : ${bUser.id}`)
  .addField("Kick par", `<@${message.author.id}> | ID : ${message.author.id}`)
  .addField("Dans le Channel", message.channel)
  .addField("A ", message.createdAt)
  .addField("Pour la raison suivante", bReason)

    let bChannel = message.guild.channels.find(`name`, "fulgu_log");
    //if (!bChannel) return message.channel.send("Manque du channel zed_log")

    message.guild.member(bUser).ban(bReason);
    bChannel.send(banEmbed);
  

}
module.exports.help = {
    name: "kick"
}