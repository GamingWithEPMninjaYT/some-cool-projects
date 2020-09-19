const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
 const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
 
    if (!message.member.hasPermissions ('MANAGE_MEMBERS')) return message.channel.send("Vous avez besoin de la permission **MANAGE_MEMBERS** pour utiliser cette commande.")
    const modlog = message.guild.channels.find(channel => channel.name === 'mod-logs');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Je ne trouve pas cet utilisateur.")
   /* let reason = message.content.split(" ").slice(2).join(" ");*/
    if (!user.roles.find(`name`, "Muted")) return message.channel.send('Cet utilisateur n est pas mute.')
    /*if (!reason) return message.channel.send('Spécifiez une raison!')*/
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(args[0] == "help"){
      message.reply("Usage: {unmute <utilisateur> <raison>");
      return;
    }
  let muteChannel = message.guild.channels.find(`name`, "mod-logs");
  if (!muteChannel) return message.channel.send('**Merci de crée le salon `mod-logs`**')

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
  

    let mutetime = args[1];

    await (user.removeRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Action | UnMute', `https://images-ext-2.discordapp.net/external/wKCsnOcnlBoNk-__BXsd6BrO6YddfUB-MtmaoaMxeHc/https/lh3.googleusercontent.com/Z5yhBQBJTSJVe5veJgaK-9p29hXm7Kv8LKF2oN0hDnsToj4wTcQbirR94XVpH4Lt5a5d%3Dw300`)
            .addField('Utilisateur', `<@${user.id}>`)
       /*     .addField('Raison', `${reason}`)*/
            .addField('Modérateur', `${mod}`)
            .setColor('#00FF80')
      		 
        modlog.send(muteembed)
  
  
}




module.exports.help = {
    name: "unmute"
   
}