const Discord = require('discord.js'); 
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
   const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
  let guild = message.guild;
  let icon = message.guild.iconURL;

  let createdAtRaw = guild.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");
  let bots = message.guild.members.filter(m => m.user.bot).size;
  let humans = message.guild.members.filter(m => !m.user.bot).size;
  let channels = message.guild.channels.size;
  let textChannels = message.guild.channels.filter(m => m.type == "text").size;
  let voiceChannels = message.guild.channels.filter(i => i.type == "voice").size;
  let emojis = [];
  guild.emojis.forEach(emoji => {
  emojis.push(`\`${emoji}\``);
  });
  emojis.length === 0 ? emojis = "None" : emojis = emojis.join(", ");

  let roles = [];
  guild.roles.forEach(role => {
    roles.push(`\`${role.name}\``);
  });
  roles = roles.join(", ");

  let embed = new Discord.RichEmbed()
  .setTitle(`Server Stats`)
  .setColor('#36393e')
  .setThumbnail(icon)
  .addField('Nom du serveur', "``"+ guild.name+"``", true)
  .addField('ID du serveur ', "``"+ guild.id+ "``", true)
  .addField('Créateur du serveur', "``"+ `${guild.owner.user.tag}`+"``", true)
  
  .addField('Région', "``"+ guild.region.toUpperCase()+"``", true)
  .addField('Crée le', "``"+ `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`+"``", true)
  .addField('Membres', "``"+  guild.memberCount+"``", true)
  .addField('Bots', "``"+ bots+"``", true)
  .addField('Humains', "``"+ humans+"``", true)
  .addField('Niveau de vérification',"``"+  guild.verificationLevel+"``", true)
  .addField('Channels textuels', "``"+ textChannels+"``", true)
  .addField('Channels vocaux', "``"+ voiceChannels+"``", true)
  .addField(`Roles`, "``"+ `${guild.roles.size}`+"``", true)
  .addField(`Emojis`, "``"+ `${guild.emojis.size}`+"``", true)

  return message.channel.send(embed);
}


module.exports.help = {
  name: "serverinfo"
}


