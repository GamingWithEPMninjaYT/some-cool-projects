// Main variables 
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./tools/config.json");
const math = require("mathjs")

let prefix = config["prefix"];

// Ready event

bot.once("ready", () => {
    console.log(">_ Bot prêt")
    bot.user.setActivity("En développement")
    bot.user.setStatus("dnd");
    /* In case you want to change the bot's avatar :
     bot.user.setAvatar("./classroom.png")
     */
});

// Only static commands there (without args)

let static = require("./commands/statique");
bot.on("message", async message => {
    let cmd = e => message.content == prefix + e;
    static.test(cmd, message)
    static.help(cmd, bot, message)
    static.serverinfo(cmd, message)
  //  static.meme(cmd, message)
   
})

// Only (with args) commands there

let args_cmd = require("./commands/args_cmd");
bot.on("message", async message => {
    let cmd = e => message.content.startsWith(prefix + e)
   args_cmd.sondage(cmd, message)
    args_cmd.eval(cmd, message)
    args_cmd.calc(cmd, message, math)
      args_cmd.eleve(cmd, message)
       
    args_cmd.canonique(cmd, message, math)
      args_cmd.discriminant(cmd, message)
    args_cmd.resoudre(cmd, message)
    args_cmd.translate(cmd, message)
    args_cmd.question(cmd, message)
    args_cmd.roulette(cmd, message)
})

// Running the bot with his token

bot.login(config["token"])
