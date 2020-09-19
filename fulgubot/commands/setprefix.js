const d = require("discord.js")

const fs = require("fs")

const pre = require("../prefix.json")
exports.run = async(bot, message, args)=>{
  if(!args[0]) return message.channel.send("**Merci de rentrer un prefix valide")
  pre[message.guild.id]={
    value: args[0]
  }
  fs.writeFile("./prefix.json", JSON.stringify(pre), (err) =>{
    if(err) console.log(err)
  })
}
exports.help ={
  name:"setprefix"
}