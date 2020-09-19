
const Discord = require('discord.js');
exports.run = async(bot,message,args)=>{
var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = args[0]; // Your MC server IP or hostname address
var mcPort = 25565; // Your MC server port (25565 is the default)

        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = '*Ce serveur est offline*';
            if(body.online) {
                status = 'Ce serveur est en ligne';
                if(body.players.now) {
                    status +='**' + body.players.now + '** Joueurs sont en train de jouer ';
                } else {
                    status += '*Personne ne joue*';
                }
            }
            message.reply(status);
        })
        }
    exports.help ={
      name:"st"
    }