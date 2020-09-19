const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db")
module.exports.run = async (bot, message, args) => {
  const botconfig = require("../botconfig.json");
  if(!message.content.startsWith(botconfig.prefix)) return; 
   let timeout = 86400000 // 24 hours in milliseconds, change if you'd like.
    let amount = 500
    // random amount: Math.floor(Math.random() * 1000) + 1;


    let daily = await db.fetch(`daily_${message.author.id}`);

   if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));
        message.channel.send(`Vous avez déjà utilisé cette commande, merci de revenir dans **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    } else {
  var embedbot = new Discord.RichEmbed()
    .setTitle("FulguInfo | FulguBot")
    .addField("Présentation : ", "``Yo c'est Fulgury et je n'ai pas grand chose à dire de plus``", true)
       .addField("Discord :", "``Fulgury™#7162`` [Lien](https://discordapp.com/users/368782799928295436)" , true)
      .addField("Serveur Discord : ",   "[Lien](https://discord.gg/bhdv33m)" , true)
   .addField("ID :", "``368782799928295436``", true)
  .addField("YouTube :", "[Lien](https://www.youtube.com/channel/UC_E-iORzOWwbE3Qm_3G7NDQ)", true) 
    .addField("Nombre d'abonées", "``" + "+250" + "``", true)
   .addField("Nombre de vues", "``" + "+6000" + "``", true)
    .setFooter("Erreur ? Problème ? Fulgury™#7162 !")
    .setColor("#F94400")
    message.channel.sendEmbed(embedbot)
 db.set(`daily_${message.author.id}`, Date.now()+1)
   }
}
module.exports.help = {
    name: "fulguinfo"
}