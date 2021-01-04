const Discord = require("discord.js")
const config = require("../tools/config.json")
const randomPuppy = require("random-puppy")

let prefix = config["prefix"]

module.exports =   {

    test: function(cmd, message) {

        if(cmd("test")) {
            message.channel.send("Test OK, 0 erreurs constatés.")
        }
    },
    help: function(cmd, bot, message) {
        if(cmd("help")) {
        let commands = ["eval", "help", "test", "calc", "sondage", "eleve", "serverinfo", "canonique", "discriminant", "resoudre", "meme", "translate", "question", "roulette"]
        let embed = new Discord.MessageEmbed()
        .setTitle("Commande d'aide | 1g1 bot")
        .setDescription("-> `Prefix` : /\n -> `N.B` : Je tiens a préciser que le bot est encore en cours de développement.")
        .addField("Commandes actuellement disponibles : ", "`"+commands.join(" | ")+"`", true)
        .setFooter(`Version ${config["version"]}\n${config["author"]}`)
        .setTimestamp()
        .setThumbnail(bot.user.displayAvatarURL());

        message.channel.send(embed)
    }
    },
    serverinfo: function(cmd, message) {
        if(cmd("serverinfo")) {
        let guild = message.guild.createdAt;
        let reg = `Le : ${guild.getFullYear()}/${guild.getMonth()}/${guild.getDate()}\n A : ${guild.getHours()}:${guild.getMinutes()}:${guild.getSeconds()}`
        let stats = `**Membres totaux** : ${message.guild.memberCount}\n**Humains** : ${message.guild.members.cache.filter(r => !r.user.bot).size}\n**Robots** : ${message.guild.members.cache.filter(r => r.user.bot).size}\n**Rôles** : ${message.guild.roles.cache.size}\n**Emojis** : ${message.guild.emojis.cache.size}\n**Channels** : ${message.guild.channels.cache.size}`;
    



            let e = new Discord.MessageEmbed()
            .setColor("#00FF00")
            .setTitle("Nom du serveur", message.guild.name)
            .addField("Créateur du serveur", message.guild.owner.displayName)
            .addField("Date de création", reg)
            .addField("Statistiques", stats)
            .setThumbnail(message.guild.iconURL())
            .setFooter("Version "+config["version"]+"\n"+config["author"]);

            message.channel.send(e)
        }
    },

    
    
  meme: function(cmd, message) {

     const randomPuppy = require("random-puppy")
       randomPuppy("memes").then(url => {
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Ici un meme selectionner pour vous")
            .setImage(url)
            .setFooter("Version "+config["version"]+"\n"+config["author"]);
           
        })
    }
}

