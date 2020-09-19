  const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete()
  const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Vous n'avez pas la permission d'effectuer cette action**")

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
  if (!bUser) return message.channel.send("**Veuillez mentionner un utilisateur valide**")
 
  let bReason = args.join(" ").slice(1);
 
  if(!bReason) return message.channel.send("**Merci de mettre une raison valable à ce ban**")



  let banEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription("Ban | FulguBot")
  .addField("Utilisateur Banni", `${bUser} | ID : ${bUser.id}`)
  .addField("Banni par", `<@${message.author.id}> | ID : ${message.author.id}`)
  .addField("Dans le Channel", message.channel)
  .addField("A ", message.createdAt)
  .addField("Pour la raison suivante", bReason)

    let bChannel = message.guild.channels.find(`name`, "fulgu_log");
    //if (!bChannel) return message.channel.send("Manque du channel zed_log")

    message.guild.member(bUser).ban(bReason);
    bChannel.send(banEmbed);
  

}
module.exports.help = {
    name: "ban"
}