const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "{";
const snekfetch = require("snekfetch");
const Canvas = require("canvas");

const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log("Ping received!");
  response.sendStatus(200);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = { app };
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands !");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
bot.on("ready", async () => {
  console.log(`${bot.user.username} est en ligne`);
  bot.user.setActivity("{help | Fulgury State", {
    type: "STREAMING",
    url: "https://www.twitch.tv/fulgury"
  });
  bot.user.setStatus("dnd");
});

bot.on("guildMemberAdd", async member => {
  const bd = require("./bd.json");
  if (!bd[member.guild.id]) {
    bd[member.guild.id] = {
      bvn: "bienvenue"
    };
  }
  fs.writeFile("./bd.json", JSON.stringify(bd), err => {
    if (err) console.log(err);
  });
  var embed = new Discord.RichEmbed().setDescription(bd[member.guild.id].bvn);
  member.send(embed);
});
bot.on("message", async message => {
  if (message.content === prefix + "help") {
    var embed = new Discord.RichEmbed()
      .setTitle("Commandes Help | FulguBot")
      .setDescription(
        "**FulguBot est le bot officiel du serveur FulguryState ! Amusez-vous bien avec.**\nPrefix : ``{``"
      )
      .addField("``General``", "botinfo | serverinfo | userinfo | day")
      .addField(
        "``Moderation``",
        "ban  | unban | kick | clear | mute | unmute | warn | warnlevel | unwarn"
      )
      .addField(
        "``Utilitaire``",
        "setbvn | giveaway | setdmbvn | reactrole | sondage"
      )
      .addField(
        "``Economie``",
        "setranklvl | setrecompense | setxp | resetxp | "
      )
      .addField("``Fulgury``", "FulguInfo")
      .setTimestamp()
      .setFooter("Enjoy it ! | ZedDevs");
    message.channel.send(embed);
  }
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
});
const wlcFile = JSON.parse(fs.readFileSync("./wlc.json", "utf8"));

bot.on("message", async message => {
  if (message.author.bot) return;
  if (!wlcFile[message.guild.id])
    wlcFile[message.guild.id] = {
      channel: "bienvenue"
    };
  if (message.content.startsWith(prefix + "setbvn")) {
    let chane = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    wlcFile[message.guild.id].channel = chane;
    if (!chane) return message.channel.send("**Bon usage** {setbvn channel");
    message.channel.send(`Welcome Channel a été changer sur : ${chane}`);
    fs.writeFile("./wlc.json", JSON.stringify(wlcFile), function(e) {
      if (e) throw e;
    });
  }
});
const client = new Discord.Client();

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");

  let fontSize = 70;

  do {
    ctx.font = `${(fontSize -= 10)}px verdana`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

bot.on("message", async message => {
  const lvl = require("./levels.json");

  if (!lvl[message.author.id]) {
    lvl[message.author.id] = {
      level: 1,
      messages: 0,
      nxtlevel: 100,
      xp: 0,
      curamnt: 3
    };
  }
  fs.writeFile("./levels.json", JSON.stringify(lvl), err => {
    if (err) console.log(err);
  });

  if (message.content) {
    let curxp = lvl[message.author.id].xp;
    let curlvl = lvl[message.author.id].level;
    let curmsg = lvl[message.author.id].messages;
    let curnxt = lvl[message.author.id].nxtlevel;
    let curamnt = lvl[message.author.id].curamnt;
    lvl[message.author.id] = {
      level: curlvl,
      messages: parseInt(curmsg) + 1,
      xp: parseInt(curxp) + curamnt,
      nxtlevel: curnxt,
      curamnt: curamnt
    };
    fs.writeFile("./levels.json", JSON.stringify(lvl), err => {
      if (err) console.log(err);
    });
  } else {
    return;
  }
  let curxp = lvl[message.author.id].xp;
  let curlvl = lvl[message.author.id].level;
  let curamnt = lvl[message.author.id].curamnt;
  let curmsg = lvl[message.author.id].messages;
  let curnxt = lvl[message.author.id].nxtlevel;
  if (lvl[message.author.id].xp == lvl[message.author.id].nxtlevel) {
    lvl[message.author.id] = {
      level: parseInt(curlvl) + 1,
      messages: parseInt(curmsg) + 1,
      xp: parseInt(curxp) + curamnt,
      nxtlevel: curnxt + 100,
      curamnt: curamnt + 4
    };
    fs.writeFile("./levels.json", JSON.stringify(lvl), err => {
      if (err) console.log(err);
    });

    var lvlupembed = new Discord.RichEmbed()
      .setColor("#000")
      .setTitle("Vous avez level up")
      .setDescription(`Vous êtes désormais ${curlvl}`)
      .addField("Xp jusqu'au prochain level", curnxt)
      .addField("Nombre d'xp total", curxp);
    message.channel.send(lvlupembed);
  }
});

bot.on("message", async message => {
  const nb = require("./nbmode.json");
  if (!nb[message.guild.id]) {
    nb[message.guild.id] = {
      value: "off"
    };
  }
  fs.writeFile("./nbmode.json", JSON.stringify(nb), err => {
    if (err) console.log(err);
  });

  const bd = require("./bd.json");
  if (!bd[message.author.id]) {
    bd[message.author.id] = {
      value: "off"
    };
  }
  fs.writeFile("./bd.json", JSON.stringify(bd), err => {
    if (err) console.log(err);
  });
  if (nb[message.guild.id].value == "on") {
    let intify = parseInt(message.content);
    if (!Number.isNaN(intify)) {
      return;
    } else {
      message.delete();
    }
  } else if (nb[message.guild.id] == "off") {
    return;
  }
});
bot.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find(ch => ch.name === "bienvenue");

  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);

  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/568045161964109838/645298057944236052/PicsArt_09-29-10.10.39.jpg"
  );

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = "28px verdana";

  ctx.fillStyle = "#ffffff";

  ctx.fillText("Bienvenue à,", canvas.width / 2.5, canvas.height / 3.5);

  ctx.font = applyText(canvas, `${member.displayName}!`);

  ctx.fillStyle = "#ffffff";

  ctx.fillText(
    `${member.displayName}!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  ctx.beginPath();

  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);

  ctx.closePath();

  ctx.clip();

  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);

  const avatar = await Canvas.loadImage(buffer);

  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );

  channel.send(`Bienvenue sur le serveur, ${member}!`, attachment);
});
const setupCMD = "{reactrole";
let initialMessage =
  "**Merci de mettre une réaction sous le rôle que vous souhaitez.**";
const roles = ["Notification", "Homme", "Femme"];
const reactions = ["🔔", "👨", "👩"];
const yourID = 327074335238127616;
if (roles.length !== reactions.length)
  throw "La liste des rôles et celle des réactions ne sont pas de tailles égales!";

function generateMessages() {
  var messages = [];
  messages.push(initialMessage);

  for (let role of roles) messages.push(`**"${role}"** !`);
  return messages;
}

bot.on("message", message => {
  if (message.author.id == yourID) {
    if (message.content.toLowerCase() == setupCMD) {
      var toSend = generateMessages();
      let mappedArray = [
        [toSend[0], false],
        ...toSend.slice(1).map((message, idx) => [message, reactions[idx]])
      ];
      for (let mapObj of mappedArray) {
        message.channel.send(mapObj[0]).then(sent => {
          if (mapObj[1]) {
            sent.react(mapObj[1]);
          }
        });
      }
    }
  }
});
bot.on("raw", event => {
  if (
    event.t === "MESSAGE_REACTION_ADD" ||
    event.t == "MESSAGE_REACTION_REMOVE"
  ) {
    let channel = bot.channels.get(event.d.channel_id);
    let message = channel.fetchMessage(event.d.message_id).then(msg => {
      let user = msg.guild.members.get(event.d.user_id);

      if (msg.author.id == bot.user.id && msg.content != initialMessage) {
        var re = `\\*\\*"(.+)?(?="\\*\\*)`;
        var role = msg.content.match(re)[1];

        if (user.id != bot.user.id) {
          var roleObj = msg.guild.roles.find(r => r.name === role);
          var memberObj = msg.guild.members.get(user.id);

          if (event.t === "MESSAGE_REACTION_ADD") {
            memberObj.addRole(roleObj);
          } else {
            memberObj.removeRole(roleObj);
          }
        }
      }
    });
  }
});

const setupCMDe = "{captcha";
let initialMessagee =
  "**Merci de cocher la case ci-dessous pour avoir accès au serveur.**";
const rolese = ["Rules"];
const reactionse = ["✅"];
const yourIDe = 327074335238127616;
if (rolese.length !== reactionse.length)
  throw "La liste des rôles et celle des réactions ne sont pas de tailles égales!";

function generateMessagese() {
  var messages = [];
  messages.push(initialMessagee);

  for (let role of rolese) messages.push(`**"${role}"**`);
  return messages;
}

bot.on("message", message => {
  if (message.author.id == yourIDe) {
    if (message.content.toLowerCase() == setupCMDe) {
      var toSend = generateMessagese();
      let mappedArray = [
        [toSend[0], false],
        ...toSend.slice(1).map((message, idx) => [message, reactionse[idx]])
      ];
      for (let mapObj of mappedArray) {
        message.channel.send(mapObj[0]).then(sent => {
          if (mapObj[1]) {
            sent.react(mapObj[1]);
          }
        });
      }
    }
  }
});
bot.on("raw", event => {
  if (
    event.t === "MESSAGE_REACTION_ADD" ||
    event.t == "MESSAGE_REACTION_REMOVE"
  ) {
    let channel = bot.channels.get(event.d.channel_id);
    let message = channel.fetchMessage(event.d.message_id).then(msg => {
      let user = msg.guild.members.get(event.d.user_id);

      if (msg.author.id == bot.user.id && msg.content != initialMessagee) {
        var re = `\\*\\*"(.+)?(?="\\*\\*)`;
        var role = msg.content.match(re)[1];

        if (user.id != bot.user.id) {
          var roleObj = msg.guild.roles.find(r => r.name === role);
          var memberObj = msg.guild.members.get(user.id);

          if (event.t === "MESSAGE_REACTION_ADD") {
            memberObj.addRole(roleObj);
          } else {
            memberObj.removeRole(roleObj);
          }
        }
      }
    });
  }
});
bot.on("message", async message => {
  const w = require("./bd.json");
  if (w[message.author.id].value == 3) {
    message.guild.member(message.author).ban();
  } else if (w[message.author.id].value == 2) {
    message.guild.member(message.author).kick();
  } else {
    return;
  }
});

const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube("AIzaSyDHNUznM8yJgZinl2OOm9FnpCaIxqO6YpE");
const queue = new Map();

var servers = {};

bot.on("message", async message => {
  const prefix = "{";
  var args = message.content.substring(prefix.length).split(" ");
  if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(" ");
  var url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  var serverQueue = queue.get(message.guild.id);
  switch (args[0].toLowerCase()) {
    case "play":
      var voiceChannel = message.member.voiceChannel;
      const ve = new Discord.RichEmbed()
        .setColor("#000")
        .setTimestamp()
        .addField("Erreur", "Vous n'êtes pas dans un channel vocal.");

      if (!voiceChannel) return message.channel.send(ve);
      var permissions = voiceChannel.permissionsFor(message.client.user);
      const phc = new Discord.RichEmbed()
        .setColor("#000")
        .setTimestamp()
        .addField(
          "Erreur",
          "Je n'ai pas les permissions de me connecter à un channel vocal."
        );

      if (!permissions.has("CONNECT")) {
        return message.channel.send(phc);
      }
      const phs = new Discord.RichEmbed()
        .setColor("#000")
        .setTimestamp()
        .addField("Erreur", "Je n'ai pas la permission de parler.");

      if (!permissions.has("SPEAK")) {
        return message.channel.send(phs);
      }
      if (
        url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)
      ) {
        var playlist = await youtube.getPlaylist(url);
        var videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          var video2 = await youtube.getVideoByID(video.id);
          await handleVideo(video2, message, voiceChannel, true);
        }
        const pl = new Discord.RichEmbed()
          .setColor("#000")
          .setTimestamp()
          .addField("Queue", "Ajout du titre a la playlist.");

        return message.channel.send(pl);
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);
            var index = 0;
            message.channel.sendEmbed({
              embed: "test",
              title: "Sélection de titre correspondant a votre recherche :",
              description: `
${videos.map(video2 => `**${++index} -** ${video2.title}`).join("\n")}
Veuillez entrer un chiffre entre 1 et 10.
					`
            });

            try {
              var response = await message.channel.awaitMessages(
                message2 => message2.content > 0 && message2.content < 11,
                {
                  maxMatches: 1,
                  time: 10000,
                  errors: ["time"]
                }
              );
            } catch (err) {
              console.error(err);
              const er = new Discord.RichEmbed()
                .setColor("#000")
                .setTimestamp()
                .addField(
                  "Erreur",
                  "Vous n'avez pas selectionné dans le temps imparti/Il y a eu une erreur pendant la sélection."
                );

              return message.channel.send(er);
            }
            var videoIndex = parseInt(response.first().content);
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          } catch (err) {
            console.error(err);
            const nr = new Discord.RichEmbed()
              .setColor("#000")
              .setTimestamp()
              .addField("Erreur", "Je n'ai pas obtenu de résultats.");

            return message.channel.send(nr);
          }
        }
        return handleVideo(video, message, voiceChannel);
      }
      break;
    case "skip":
      const mmv = new Discord.RichEmbed()
        .setColor("#000")
        .setTimestamp()
        .addField("Erreur", "Vous n'êtes dans aucun channel.");

      if (!message.member.voiceChannel) return message.channel.send(mmv);

      const sq = new Discord.RichEmbed()
        .setColor("#000")
        .setTimestamp()
        .addField("Erreur", "Aucun titre dans la playlist.");

      if (!serverQueue) return message.channel.send(sq);
      serverQueue.connection.dispatcher.end("Skip command has been used!");
      return undefined;
      break;
    case "stop":
      if (!message.member.voiceChannel) return message.channel.send(mmv);

      if (!serverQueue) return message.channel.send(sq);
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end("Stop command has been used!");
      return undefined;
      break;
    case "volume":
      if (!message.member.voiceChannel) return message.channel.send(mmv);
      if (!serverQueue) return message.channel.send(sq);
      if (!args[1]) {
        const vl = new Discord.RichEmbed()
          .setColor("#000")
          .setTimestamp()
          .addField("Volume", `Le volume est à ${serverQueue.volume}`);
        return message.channel.send(vl);
      }
      serverQueue.volume = args[1];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      const vl1 = new Discord.RichEmbed()
        .setColor("#000")
        .setTimestamp()
        .addField("Volume", `Volume réglé sur **${args[1]}**`);
      return message.channel.send(vl1);
      break;
    case "nowplaying":
      if (!serverQueue) return message.channel.send(mmv);
      const ma = new Discord.RichEmbed()
        .setColor("#000")
        .setTimestamp()
        .addField(
          "Nowplaying",
          `Musique actuelle : ${serverQueue.songs[0].title}`
        );
      return message.channel.send(ma);
      break;
    case "queue":
      if (!serverQueue) return message.channel.send(sq);
      const pl1 = new Discord.RichEmbed()
        .setColor("#000")
        .setTimestamp()
        .addField(
          "Volume",
          `__**Playlist**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
**Joue :** ${serverQueue.songs[0].title}`
        );
      return message.channel.send(pl1);
      break;
    case "pause":
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.sendEmbed({
          embed: "test",
          description: "⏸ J'ai mis la musique en pause pour vous"
        });
      }
      return message.channel.sendEmbed({
        embed: "test",
        description: "Il n'y a aucune musique"
      });
      break;
    case "resume":
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.sendEmbed({
          embed: "test",
          description: "▶ J ai remis la musique !"
        });
      }
      return message.channel.sendEmbed({
        embed: "test",
        description: "Il n y a aucune musique"
      });

      return undefined;
      break;
  }
  async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);
    console.log(video);
    var song = {
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
      var queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.sendEmbed({
          embed: "test",
          description: `Je ne peux pas rejoindre ce salon ${error}`
        });
      }
    } else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      if (playlist) return undefined;
      else
        return message.channel.sendEmbed({
          embed: "test",
          description: `✅ **${song.title}** a été ajoutée a la playlist`
        });
    }
    return undefined;
  }
  function play(guild, song) {
    var serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", reason => {
        message.channel.sendEmbed({
          embed: "test",
          description: "```La chanson est finie```"
        });
        if (reason === "Stream is not generating quickly enough.")
          console.log("Song ended.");
        else console.log(reason);
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    message.channel.sendEmbed({
      embed: "test",
      description: `Je joue :  **${song.title}**`
    });
  }
});

bot.login(process.env.TOKEN);
