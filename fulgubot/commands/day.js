const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")
const moment = require('moment')
moment.locale('FR')
exports.run = async(bot, message)=>{
  
  let timeout = 86400000 // 24 hours in milliseconds, change if you'd like.
    let amount = 500
    // random amount: Math.floor(Math.random() * 1000) + 1;


    let daily = await db.fetch(`daily_${message.author.id}`);

   if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));
        message.channel.send(`Vous avez déjà utilisé cette commande, merci de revenir dans **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    } else {
 /* let wMember = message.mentions.users.first() || message.author;*/
  /*var embed = new Discord.RichEmbed()*/
   let date = new Date()
let hours = date.getHours() + 1
let min = date.getMinutes()
let sec = date.getSeconds()
let y = date.getFullYear()
let m = date.getMonth() + 1
let d = date.getDate()

message.channel.send(`Nous sommes le ${y} / ${m} / ${d} et il est ${hours} : ${min} : ${sec}`)
  /*.addField("Rejoins le", `${moment.utc(message.guild.joinedAt).format("LL")}`)
  
  message.channel.send(embed)*/
  
  db.set(`daily_${message.author.id}`, Date.now())
   }
}

exports.help = {
  name: "day"
}