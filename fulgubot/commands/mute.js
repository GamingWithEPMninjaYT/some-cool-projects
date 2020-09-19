const ms = require ("ms");
const Discord = require("discord.js")
exports.run = async (bot, message, args) => {
  let tomute = message.guild.member (message.mentions.users.first () || message.guild.members.get (args [0]));
  if (! tomute) return message.reply ("Impossible de trouver l'utilisateur.");
  if (tomute.hasPermission ("MANAGE_MESSAGES")) return message.reply ("Impossible de les mettre en sourdine!");
  let muterole = message.guild.roles.find (`name`,"Muted");
  
  if (! muterole) {
    try {
      muterole = await message.guild.createRole ({
        nom:"Muted",
        color: "#000"
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions (muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log (e.stack);
    }
  }

  let mutetime = args [1];
  
  if (! mutetime) return message.reply ("vous n'avez pas spécifié d'heure!");

  await (tomute.addRole (muterole.id));
  message.channel.send(`<@${tomute.id}> a été mis en sourdine pour ${ms(ms(mutetime))}`)
  var e = new Discord.RichEmbed()
  .setColor("#000")
  .addField("Membre mute", tomute.user.username, true)
  .addField("Par", message.author.username)
  .addField("Pour", ms(ms(mutetime)))
    bot.channels.get("581862599873003522").send(e)

  setTimeout (function () {
    tomute.removeRole (muterole.id);
    message.channel.send (`<@${tomute.id}> n'a pas été mis en sourdine!`);
  }, ms (mutetime));

}
exports.help ={
  name:"mute",
  aliases: ["m"]
}