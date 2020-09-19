const d = require("discord.js");

exports.run = async(bot, message, args) => {

    var tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[2]));

        var reason = args[1]

        var mutetime = args[2];

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Hahahaha, non.");

        if(!tomute) return message.reply("Mentionnez quelqu'un s'il vous plaît.");

        if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Je ne peux pas le mute.");

        if(!reason) return message.reply("Veuillez indiquer une raison.");

        if(!mutetime) return message.reply("Veuillez indiquer un temps de mute ou sinon utilisé la commande `{mute [reason] [@user]`");

        try{

            tomute.send(`Vous avez été mute ${mutetime}.`);

        }catch(e){

            message.channel.send(`L'utilisateur à été mute ${mutetime}`);

        }

        var muteembed = new d.RichEmbed()

        .addField("Utilisateur mute :", tomute)

        .addField("Mute pendant :", mutetime)

        .addField("Raison :", reason);

        message.channel.send(muteembed);

        message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {

            channel.overwritePermissions(tomute, {

                SEND_MESSAGES: false,

                ADD_REACTIONS : false,

            });

        });
}
   exports.help = {
  name: "tempmute"
}