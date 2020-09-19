
const file = require("../nbmode.json")
const fs = require("fs")
exports.run = async(bot, message, args) => {
             let tte = args[0]
             if(!tte) return message.channel.send("Merci d'entrer un mode on/off")
  if(tte == "on") {
    file[message.guild.id] = {
      value: "on"
    }
    fs.writeFile("./nbmode.json", JSON.stringify(file), (err) => {
      if(err) console.log(err)
    });
    
    message.channel.send("Moode changé sur on avec succès.")
    
  }else if(tte == "off") {
   file[message.guild.id] = {
      value: "off"
    }
    fs.writeFile("./nbmode.json", JSON.stringify(file), (err) => {
      if(err) console.log(err)
    });
    
    message.channel.send("Moode changé sur off avec succès.")
    
  }
  }
exports.help = {
  name:"setnb"
}