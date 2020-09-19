const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
   
  var embedbot = new Discord.RichEmbed()
    .setTitle("Informations du Bot !")
    .addField("Nom du bot", "``FulguBot``")
      .addField("Nombre de personne total :", "``" + bot.users.size+  "``", true)
    .addField("Crée par :", "``" + "ZedRoff#6104"+ "``", true)
    .addField("Owner :", "``" + "Fulgury™#7162"+ "``", true)
  .addField("Date :", "``"+"20/09/19"+"``", true)
   /*  .addField("• Users", "``" + `${bot.users.size.toLocaleString()}` + "``" , true)
            .addField("• Channels ", "``" + `${bot.channels.size.toLocaleString()}` + "``" , true)*/
           
    .addField("Nombre de commandes", "``" + 19 + "``", true)
  .addField("Version", "``"+1.0+"``", true)
    .setFooter("Erreur ? Problème ? Fulgury™#7162 !")
    .setColor("#F94400")
    message.channel.sendEmbed(embedbot)
 
}
module.exports.help = {
    name: "botinfo"
}