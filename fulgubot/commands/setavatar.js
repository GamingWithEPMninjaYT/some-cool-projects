exports.run = async(bot, message, args) => {
  if(message.author.id !== "368782799928295436") return message.channel.send("Vous n'avez pas la permission de faire cela")
  bot.user.setAvatar(args[0])
  if(!args[0]) return message.reply("Merci de rentrer une URL valide.")
  message.channel.send("Avatar changé avezc succès sur"+" "+args[0])
}
exports.help = {
  name: "setavatar"
}