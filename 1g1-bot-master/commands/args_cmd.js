const Discord = require("discord.js");
const config = require("../tools/config.json")

let prefix = config["prefix"]

module.exports =   {
    sondage: function(cmd, message) {

        if(cmd("sondage")) {

            let oof = message.content;
            const q = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
            oof = oof.split(" ").slice(1);
            oof = oof.join(" ")
            oof = oof.split("}")
            let nzo = oof[0]
            let question = nzo.replace("{",  "");
              if(!question) return message.channel.send("**/sondage {Question} [choix1] [choix2] [etc] | La question est manquante**")
            oof = oof.slice(1).join("").trim()
            oof = oof.split("]")
              if(!oof) return message.channel.send("**Les choix sont manquants | Rappel : /sondage {Question} [choix1] [choix2] [choix3] [etc]**")
            let c = []
            for(let i=0;i<=oof.length-2;i++){
            c.push(q[i]+" "+oof[i].replace("[", "").trim())
            }
            
            const e = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(question)
            .addField("Choix", c.join("\n").trim())
            .setFooter("Version "+config["version"]+"\n"+config["author"])
            .setThumbnail("https://cdn.glitch.com/5f373f55-ab8d-4671-80ea-c21805f80314%2F88430-information-icons-text-wallpaper-question-computer.png?v=1588181275634")
            message.channel.send(e).then(m=>{
            
            for(let   i=0;i<=c.length-1;i++){
            m.react(q[i])
            }
            })
                }
    },
    eval: function(cmd, message) {
        if(cmd("eval")) {
            const args = message.content.split(" ").slice(1)
            const clean = text => {
                if (typeof text === "string")
                  return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
                else return text;
              };
          
              if (message.author.id !== "327074335238127616") return message.channel.send("Commande interdite.")
             
              try {
                const code = args.join(" ");
                  let evaled = eval(code);
          
                if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
          
                message.channel.send(clean(evaled), { code: "xl" });
              } catch (err) {
                message.channel.send(`\`ERREUR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
      
        }
    },
      calc: function(cmd, message, math) {
        if(cmd("calc")) {

       
            
            let args = message.content.split(" ").slice(1)
        if(!args[0]) return message.channel.send("**Merci d'écrire une expression mathématique a calculer**")
            let resp;
            try {
                resp = math.evaluate(args.join(' '));
            }catch(e) { 
                return message.channel.send("Mauvaise expression, si vous considérez tout de même que votre expression est valide, allez voir zedroff")
            
            }
                if(resp.length > 2047) return message.channel.send("L'expression était trop longue pour être affichée sur Discord.")
            let e = new Discord.MessageEmbed()
            .setColor(0xffffff)
            .setTitle("Calculatrice")
            .addField("➤ Expression", `\`\`\`js\n${args.join('')}\`\`\``)
            .addField("➤ RÉSULTAT", `\`\`\`js\n${resp}\`\`\``)
            .setFooter("Version "+config["version"]+"\n"+config["author"])
            .setTimestamp()
            message.channel.send(e)
    
        
      
        }

      },
      eleve: function(cmd, message) {
        if(cmd("eleve")) {
            let args = message.content.split(" ").slice(1);
    
            let target = message.mentions.members.first() || message.guild.member(args[0]) || message.member;
            let r = target.roles.cache.map(r => r.name);
            r = r.filter(x => x.includes("Spécialité"))
  
            let embed = new Discord.MessageEmbed()
            .setColor("#00FFFF")
            .setTitle("Eleve Info Commande | 1g1 Bot")
            .addField("Pseudo", target.user.tag, true)
            .addField("Nom IRL", target.nickname, true)
            .addField("ID Discord", target.id, true)
            .addField("Rôle sur le serveur", target.roles.highest.name, true)
            .addField("Spécialités", r.join("\n"), false)
            .setThumbnail(target.user.displayAvatarURL())
            .setFooter("Version "+config["version"]+"\n"+config["author"]);
            message.channel.send(embed)
            console.log(target)
        }
      },
      canonique: function(cmd, message, math) {
        if(cmd("canonique")){
            let args = message.content.split(" ").slice(1)
  
          const filter = m => m.author.id == message.author.id;
          let a_val;
          let b_val;
          let c_val;
  
          function f(a, b, c, x){
            return math.evaluate(a * (x ** 2) + b * x + c)
              }
  
          message.channel.send("Valeur de `a`").then(() => {
              message.channel.awaitMessages(filter,{ max: 1, time: 50000, errors: ['time']}).then(c1 => {
                  a_val = c1.first().content
                  message.channel.send("Ok, maintenant la valeur de `b`").then(() => {
                      message.channel.awaitMessages(filter,{ max: 1, time: 50000, errors: ['time']}).then(c2 => {
                          b_val = c2.first().content
  
                          message.channel.send("Dac, et enfin la valeur de `c`").then(()=> {
                              message.channel.awaitMessages(filter,{ max: 1, time: 50000, errors: ['time']}).then(c3 => {
                                  c_val = c3.first().content
                                  let alpha = math.evaluate((-b_val) / (2*a_val))
                                  let beta = f(a_val, b_val, c_val, alpha)
                                  message.channel.send("```Forme canonique de "+`${a_val}x^2+${b_val}x+${c_val}` + "\n est : \n" +`${a_val}(x-${alpha})+${beta}`+ "```")
                         
                            
            
                
                              })
                       
                          })
  
                      })
                      })
             
              }).catch(e => {
                  message.channel.send("Oops, personne n'a répondu, j'arrête donc le processus.")
              })
          })
          
  
        }
      },
      discriminant: function(cmd, message) {
        if(cmd("discriminant")) {





            const filter = m => m.author.id == message.author.id;
                      function f(b, a, c) {
                        return b*b-4*a*c
                      }
            
            
                      message.channel.send("Valeur de `a`").then(() => {
                        message.channel.awaitMessages(filter,{ max: 1, time: 50000, errors: ['time']}).then(c1 => {
                            a_val = c1.first().content
                            message.channel.send("Ok, maintenant la valeur de `b`").then(() => {
                                message.channel.awaitMessages(filter,{ max: 1, time: 50000, errors: ['time']}).then(c2 => {
                                    b_val = c2.first().content
            
                                    message.channel.send("Dac, et enfin la valeur de `c`").then(()=> {
                                        message.channel.awaitMessages(filter,{ max: 1, time: 50000, errors: ['time']}).then(c3 => {
                                            c_val = c3.first().content
                                            let res = f(b_val, a_val, c_val)
                                            message.channel.send("```Delta de "+`${a_val}x^2+${b_val}x+${c_val}` + "\n est : \n" +`${res}`+ "```")
                                   
                                      
                      
                          
                                        })
                                 
                                    })
            
                                })
                                })
                       
                        }).catch(e => {
                            message.channel.send("Oops, personne n'a répondu, j'arrête donc le processus.")
                        })
                    })
            
            
                  }
      },
        resoudre: function(cmd, message) {
            if(cmd("resoudre")) {
                let args = message.content.split(" ").slice(1);
                if(!args[0]) return message.channel.send("Il faut executer la commande de la sorte : `/resoudre valeur_a valeur_b valeur_delta`")
                if(!args[1]) return message.channel.send("Il manque la valeur de b")
                if(!args[2]) return message.channel.send("Il manque la valeur de delta")
              
                  function f_x1(a, b, delta)  {
                      return (-b + delta ** 0.5) / 2*a
                  }
                  function f_x2(a, b, delta)  {
                      return (-b - delta ** 0.5) / 2*a
                  }
                  if(args[2] > 0) {
      
                 
              let x1 = f_x1(args[0], args[1], args[2])
              let x2 = f_x2(args[0], args[1], args[2])
      
                  message.channel.send(`${args[0]}(x - ${x1})(x - ${x2})`)
              }else if(args[2] < 0){
      message.channel.send("Aucune solution possible")
              } else if(args[2] == 0) {
                  message.channel.send(`${args[0]}(x - ${args[2]})`)
              }
          }
        },
        
        translate: function(cmd, message) {
            if(cmd("translate")) {
       
             
            const translate = require('translate-google')
          
           
    
         let sentence = message.content;
         
            sentence = sentence.split(" ").slice(1)
            if(!sentence[0]) return message.reply("**Mauvais usage : /translate [lang] (text)**")
            let argv = sentence[0].split("[")
            if(!argv[1]) return message.reply("**Mauvais usage : /translate [lang] (text)**")
            argv = argv[1].split("]")
            argv = argv[0]
       let sentencee = message.content;
       sentencee = sentencee.split(" ").slice(1)
       sentencee = sentencee.slice(1)
       if(!sentencee[0]) return message.reply("**Mauvais usage : /translate [lang] (text)**")
      
       sentencee = sentencee.join(" ")
       sentencee = sentencee.replace("(", "")
       sentencee = sentencee.replace(")", "")
         
            const tranObj = {
              c: sentencee
            }
            
            translate(tranObj, {to: argv}).then(res => {
                let embed = new Discord.MessageEmbed()
                .setColor("#6266F9")
                .setAuthor(message.author.tag)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(res.c)
           .setTimestamp()
           
           message.channel.send({ embed })
            }).catch(err => {
                console.error(err)
            })
           
        }
    
        
    },
    question: function(cmd, message) {
      if(cmd("question")) {
        let answers = [
          "Oui",
          "Bien sur",
          "Non",
          "Nope",
          "Ouaip",
          "Peut-être",
          "Je sais pas",
          "Probablement",
          "A coup sur !"
        ];
        let args = message.content.split(" ").slice(1);
        if(!args[0]) return message.channel.send("**Mauvais usage : /question [question]**");
        let res = answers[Math.floor(Math.random() * answers.length)];

        let embed = new Discord.MessageEmbed()
        .setColor("#0000FF")
        .setTitle("Question Commande | 1g1 Bot")
        .addField("Question", args.join(" "))
        .addField("Réponse", res)
        .setFooter("Version "+config["version"]+"\n"+config["author"]);

        message.channel.send(embed)
      }
    },
    roulette: function(cmd, message) {
      if(cmd("roulette")) {
        let args = message.content.split(" ").slice(1);
        if(!args[0]) return message.channel.send("**Mauvais usage : /roll [num]**");
        if(args[1]) return message.channel.send("**Uniquement un nombre, pas une phrase :D (ou un nombre composé)**")
        if(isNaN(parseInt(args[0]))) return message.channel.send("**La roulette c'est avec des nombres, pas avec des mots**")
        let res = Math.floor(Math.random() * parseInt(args[0]));

        message.channel.send("J'ai choisi pour toi : "+res)
      }
    },
    gif: function(cmd, message) {

    }
}

