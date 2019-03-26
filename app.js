const Discord = require('discord.js');
const generator = require('generate-serial-number');
const fs = require('fs');
const readline = require('readline');
const config = require('./config.json');
const bot = new Discord.Client();
const client = new Discord.Client();

const serverStats = {
    guildID: '530855198852251658', //ServerID
    totalUsersID: '530859662304870416' //UserChannelID
};

bot.on('ready',function(){
    console.log("Logged in as " + bot.user.tag);
    console.log("Bot online");
    bot.user.setStatus('dnd')
    /*bot.user.setPresence({
      game: {
          name: '+help | dedev.io',
      }
    });*/
    bot.user.setPresence({ game: { name: '+help | dedev.io', type: 2 } });  
})

bot.on("message", (message) => {
    
    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "invite") {
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Invite",
              value: "Sorry, you don't have permissions to use this!"
            }
          ],
        }});
        message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Invite",
              value: "https://discordapp.com/oauth2/authorize?client_id=529805226866376714&permissions=8&scope=bot"
            }
          ],
        }});
    }

    if(command === "website") {
        message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Website",
              value: "https://dedev.io/"
            }
          ],
        }});
    }

    if(command === "ping") {
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Ping",
              value: "Sorry, you don't have permissions to use this!"
            }
          ],
        }});
      const embed = {
        "url": "https://dedev.io/",
        "color": 13632027,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://dedev.io/img/Hand.gif",
          "text": "Made by KNIF#0001"
        },
        "thumbnail": {
          "url": "https://dedev.io/img/profile.png"
        },
        "author": {
          "name": "dedev.io",
          "url": "https://dedev.io/",
          "icon_url": "https://dedev.io/img/profile.png"
        },
        "fields": [
          {
            "name": "Ping",
            "value": `Pong! Latency is ${new Date().getTime() - message.createdTimestamp}ms!`
          }
        ]
      };
      message.channel.send({ embed });
    }

    if(command === "say") {
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Say",
              value: "Sorry, you don't have permissions to use this!"
            }
          ],
        }});
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);
    }

    if(command === "avatar") {
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Avatar",
              value: "Sorry, you don't have permissions to use this!"
            }
          ],
        }});
      var user = message.mentions.users.first();
      const embed = {
        "url": "https://dedev.io/",
        "color": 13632027,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://dedev.io/img/Hand.gif",
          "text": "Made by KNIF#0001"
        },
        "image": {
         "url": user.displayAvatarURL
        },
        "thumbnail": {
          "url": "https://dedev.io/img/profile.png"
        },
        "author": {
          "name": "dedev.io",
          "url": "https://dedev.io/",
          "icon_url": "https://dedev.io/img/profile.png"
        },
        "fields": [
          {
            "name": "Avatar",
            "value": `User: ${user.username}`
          }
        ]
      };
      message.channel.send({ embed });
    }

    if(command === "embed") {
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Embed",
              value: "Sorry, you don't have permissions to use this!"
            }
          ],
        }});
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send({embed: {
        color: 13632027,
        description: sayMessage,
        timestamp: new Date(),
        author: {
          name: "dedev.io",
          url: "https://dedev.io/",
          icon_url: "https://dedev.io/img/profile.png"
        },
        thumbnail: {
          url: "https://dedev.io/img/profile.png"
        },
        footer: {
          icon_url: "https://dedev.io/img/Hand.gif",
          text: "Made by KNIF#0001"
        },
      }});
    }

    if(command === "kick") {
      // This command must be limited to mods and admins. In this example we just hardcode the role names.
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Kick",
              value: "Sorry, you don't have permissions to use this!"
            }
          ],
        }});       

      // Let's first check if we have a member and if we can kick them!
      // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
      // We can also support getting the member by ID, which would be args[0]
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Kick",
              value: "Please mention a valid member of this server!"
            }
          ],
        }});
      if(!member.kickable) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Kick",
              value: "I cannot kick this user! Do they have a higher role? Do I have kick permissions?"
            }
          ],
        }});
      
      // slice(1) removes the first part, which here should be the user mention or ID
      // join(' ') takes all the various parts to make it a single string.
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      
      // Now, time for a swift kick in the nuts!
      member.kick(reason)
        .catch(error => message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Kick",
              value: `Sorry ${message.author} I couldn't kick because of : ${error}`
            }
          ]
        }}));
      message.channel.send({embed: {
        color: 13632027,
        timestamp: new Date(),
        author: {
          name: "dedev.io",
          url: "https://dedev.io/",
          icon_url: "https://dedev.io/img/profile.png"
        },
        thumbnail: {
          url: "https://dedev.io/img/profile.png"
        },
        image: {
          url: "https://dedev.io/img/kick.gif"
        },
        footer: {
          icon_url: "https://dedev.io/img/Hand.gif",
          text: "Made by KNIF#0001"
        },
        fields: [{
            name: "Kick",
            value: `${member.user.tag} has been kicked by ${message.author.tag}`
          },
          {
            name: "Reason",
            value: `${reason}`
          }
        ],
      }});
    }

    if(command === "ban") {
      // Most of this command is identical to kick, except that here we'll only let admins do it.
      // In the real world mods could ban too, but this is just an example, right? ;)
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) )
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Ban",
              value: "Sorry, you don't have permissions to use this!"
            }
          ],
        }});
      
      let member = message.mentions.members.first();
      if(!member)
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Ban",
              value: "Please mention a valid member of this server!"
            }
          ],
        }});
      if(!member.bannable) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Ban",
              value: "I cannot ban this user! Do they have a higher role? Do I have ban permissions?"
            }
          ],
        }});
  
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      
      member.ban(reason)
        .catch(error => message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Ban",
              value: `Sorry ${message.author} I couldn't ban because of : ${error}`
            }
          ]
        }}));
      message.channel.send({embed: {
        color: 13632027,
        timestamp: new Date(),
        author: {
          name: "dedev.io",
          url: "https://dedev.io/",
          icon_url: "https://dedev.io/img/profile.png"
        },
        thumbnail: {
          url: "https://dedev.io/img/profile.png"
        },
        image: {
          url: "https://dedev.io/img/ban.gif"
        },
        footer: {
          icon_url: "https://dedev.io/img/Hand.gif",
          text: "Made by KNIF#0001"
        },
        fields: [{
            name: "Ban",
            value: `${member.user.tag} has been banned by ${message.author.tag}`
          },
          {
            name: "Reason",
            value: `${reason}`
          }
        ],
      }});
    }

    if(command == "redeem") {
        var keysMap = new Map();
        var key = args[0];
        var redeemRole = message.guild.roles.find("name", config.role);

        var rl = readline.createInterface(fs.createReadStream('./keys.txt'));

        rl.on("line", (line) => {
            var cleaned = line.replace(",", "");
            keysMap.set(cleaned, cleaned);
        });

        rl.on("close", () => {
            if(message.member.roles.has(redeemRole.id)) {
                const embed = {
                  "url": "https://dedev.io/",
                  "color": 13632027,
                  "timestamp": new Date(),
                  "footer": {
                    "icon_url": "https://dedev.io/img/Hand.gif",
                    "text": "Made by KNIF#0001"
                  },
                  "thumbnail": {
                    "url": "https://dedev.io/img/profile.png"
                  },
                  "author": {
                    "name": "dedev.io",
                    "url": "https://dedev.io/",
                    "icon_url": "https://dedev.io/img/profile.png"
                  },
                  "fields": [
                    {
                      "name": "Redeem",
                      "value": "You've already redeemed a key!"
                    }
                  ]
                };
                message.channel.send({ embed });    
                return;
            }
    
            if(!key || key.length <= 0) {
                const embed = {
                  "url": "https://dedev.io/",
                  "color": 13632027,
                  "timestamp": new Date(),
                  "footer": {
                    "icon_url": "https://dedev.io/img/Hand.gif",
                    "text": "Made by KNIF#0001"
                  },
                  "thumbnail": {
                    "url": "https://dedev.io/img/profile.png"
                  },
                  "author": {
                    "name": "dedev.io",
                    "url": "https://dedev.io/",
                    "icon_url": "https://dedev.io/img/profile.png"
                  },
                  "fields": [
                    {
                      "name": "Redeem",
                      "value": "Specify a valid key!"
                    }
                  ]
                };
                message.channel.send({ embed });
                return;
            }
    
            if(keysMap.has(key)) {
                message.member.addRole(redeemRole);
                const embed = {
                  "url": "https://dedev.io/",
                  "color": 13632027,
                  "timestamp": new Date(),
                  "footer": {
                    "icon_url": "https://dedev.io/img/Hand.gif",
                    "text": "Made by KNIF#0001"
                  },
                  "thumbnail": {
                    "url": "https://dedev.io/img/profile.png"
                  },
                  "author": {
                    "name": "dedev.io",
                    "url": "https://dedev.io/",
                    "icon_url": "https://dedev.io/img/profile.png"
                  },
                  "fields": [
                    {
                      "name": "Redeem",
                      "value": "Key redeemed & Role recieved!"
                    }
                  ]
                };
                message.channel.send({ embed });
                keysMap.delete(key);
                var processed = 0;
                var keysString = "";
                keysMap.forEach(item => {
                    processed++;
                    if(processed == keysMap.size) {
                        keysString += `${item}`;
                        fs.writeFileSync('./keys.txt', keysString);
                    } else {
                        keysString += `${item},\n`;
                    }
                })
            } else {
                const embed = {
                  "url": "https://dedev.io/",
                  "color": 13632027,
                  "timestamp": new Date(),
                  "footer": {
                    "icon_url": "https://dedev.io/img/Hand.gif",
                    "text": "Made by KNIF#0001"
                  },
                  "thumbnail": {
                    "url": "https://dedev.io/img/profile.png"
                  },
                  "author": {
                    "name": "dedev.io",
                    "url": "https://dedev.io/",
                    "icon_url": "https://dedev.io/img/profile.png"
                  },
                  "fields": [
                    {
                      "name": "Redeem",
                      "value": "Invalid key!"
                    }
                  ]
                };
                message.channel.send({ embed });
            }
        })
    }

    if(command == "generate") {
        if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) {
          const embed = {
            "url": "https://dedev.io/",
            "color": 13632027,
            "timestamp": new Date(),
            "footer": {
              "icon_url": "https://dedev.io/img/Hand.gif",
              "text": "Made by KNIF#0001"
            },
            "thumbnail": {
              "url": "https://dedev.io/img/profile.png"
            },
            "author": {
              "name": "dedev.io",
              "url": "https://dedev.io/",
              "icon_url": "https://dedev.io/img/profile.png"
            },
            "fields": [
              {
                "name": "Generate",
                "value": "You are not the owner of the server!"
              }
            ]
          };
          message.channel.send({ embed });
          return;
        }
        
        var amount = args[0];

        if(!amount || amount.length <= 0) {
          const embed = {
            "url": "https://dedev.io/",
            "color": 13632027,
            "timestamp": new Date(),
            "footer": {
              "icon_url": "https://dedev.io/img/Hand.gif",
              "text": "Made by KNIF#0001"
            },
            "thumbnail": {
              "url": "https://dedev.io/img/profile.png"
            },
            "author": {
              "name": "dedev.io",
              "url": "https://dedev.io/",
              "icon_url": "https://dedev.io/img/profile.png"
            },
            "fields": [
              {
                "name": "Generate",
                "value": "No amount specified!"
              }
            ]
          };
          message.channel.send({ embed });
        }

        var parsedAmount = parseInt(args[0]);
        var generatedCodes = "";
        var processed = 0;

        while (processed < parsedAmount) {
            processed++;
            if(processed == parsedAmount) {
                generatedCodes += `${generator.generate(24)}`;
                fs.writeFile('./keys.txt', generatedCodes, (error) => {
                    if(error) {
                      const embed = {
                        "url": "https://dedev.io/",
                        "color": 13632027,
                        "timestamp": new Date(),
                        "footer": {
                          "icon_url": "https://dedev.io/img/Hand.gif",
                          "text": "Made by KNIF#0001"
                        },
                        "thumbnail": {
                          "url": "https://dedev.io/img/profile.png"
                        },
                        "author": {
                          "name": "dedev.io",
                          "url": "https://dedev.io/",
                          "icon_url": "https://dedev.io/img/profile.png"
                        },
                        "fields": [
                          {
                            "name": "Generate",
                            "value": "There was an error!"
                          }
                        ]
                      };
                      message.channel.send({ embed });
                      return;
                    }
                    const embed = {
                      "url": "https://dedev.io/",
                      "color": 13632027,
                      "timestamp": new Date(),
                      "footer": {
                        "icon_url": "https://dedev.io/img/Hand.gif",
                        "text": "Made by KNIF#0001"
                      },
                      "thumbnail": {
                        "url": "https://dedev.io/img/profile.png"
                      },
                      "author": {
                        "name": "dedev.io",
                        "url": "https://dedev.io/",
                        "icon_url": "https://dedev.io/img/profile.png"
                      },
                      "fields": [
                        {
                          "name": "Generate",
                          "value": "Finished generating codes!"
                        },
                        {
                          "name": "Codes:",
                          "value": generatedCodes
                        }
                      ]
                    };
                    message.channel.send({ embed });
                })
            } else {
                generatedCodes += `${generator.generate(24)},\n`;
            }
        }
    }

    if(command == "buy") {
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) 
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "Buy",
              value: "Sorry, you don't have permissions to use this!"
            }
          ],
        }});
      const embed = {
        "url": "https://dedev.io/",
        "color": 13632027,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://dedev.io/img/Hand.gif",
          "text": "Made by KNIF#0001"
        },
        "thumbnail": {
          "url": "https://dedev.io/img/profile.png"
        },
        "author": {
          "name": "dedev.io",
          "url": "https://dedev.io/",
          "icon_url": "https://dedev.io/img/profile.png"
        },
        "fields": [
          {
            "name": "__**Prices:**__",
            "value": "`1 week: (7 days)` **15€** \n`1 month: (31 days)` **25€** \n`Lifetime: (31+ days)` **35€** \n "
          },
          {
            "name": "__**Payment Options:**__",
            "value": "**PayPal ~ Bitcoin ~ Ethereum** \n "
          },
          {
            "name": "__**Note:**__",
            "value": "**If you want to pay with a different payment method, please open up a ticket with** `-new different payment` **and message me!** \n "
          },
          {
            "name": "**< :regional_indicator_t:erms :regional_indicator_o:f :regional_indicator_s:ervice >**",
            "value": "**If you buy you accept the following Terms of Service!**\n "
          },
          {
            "name": ":warning: __**IMPORTANT!**__ :warning:",
            "value": "**If you charge back your money I will deactivate your license and ban your account! This means you can't access Pulse anymore and you will be banned from the Discord, too! I am logging IP Locations and HWIDs to make sure only the buyer is able to access Pulse. If you share your Pulse Account I will notice and disable it!** \n "
          },
          {
            "name": ":triangular_flag_on_post: __**WITHDRAWS!**__ :triangular_flag_on_post:",
            "value": "**I will release you IP, Adress, Location if you withdraw you money. You will be in the scammer channel and I will report you for fraud!** \n "
          },
          {
            "name": ":x: __**SCAMMERS!**__ :x:",
            "value": "**Look into <#524552180389380096> to find out what happens if you do something listed above!**\n "
          },
          {
            "name": ":beginner: __**NO REFUNDS!**__ :beginner:",
            "value": "**I have a no refund policy because many just buy it and then share it, so no refunds!**\n "
          },
          {
            "name": ":radioactive: __**NO RESELLING!**__ :radioactive:",
            "value": "**If you resell Pulse i will ban your and all the accounts of your Buyers in my Discord and in the Spoofer!**\n __**IT IS ILLEGAL TO RESELL PULSE OR ANY OF MY OTHER PRODUCTS! I WILL REPORT YOU FOR THEFT!**__\n "
          },
          {
            "name": ":children_crossing: __**NO TRIALS!**__ :children_crossing: ",
            "value": "**I don't make Trial Versions due to Pulse getting patched when too many use it!**\n "
          },
          {
            "name": "**< :regional_indicator_t:erms :regional_indicator_o:f :regional_indicator_s:ervice >**",
            "value": "**This were the Terms of Service!**\n "
          },
          {
            "name": ":dollar: __**Buy Pulse:**__ :dollar:",
            "value": "**You ONLY can buy Pulse on my Website below!**"
          },
          {
            "name": ":fast_forward: __**https://dedev.io/**__ :rewind:",
            "value": "**Check out my Website for further information about Pulse!**"
          }
        ]
      };
      message.channel.send({ embed });
    }

    if(command == "help") {
      if(!message.member.roles.some(r=>["✯ Owner ✯"].includes(r.name)) ) {
        //nicht owner
        return message.channel.send({embed: {
          color: 13632027,
          timestamp: new Date(),
          author: {
            name: "dedev.io",
            url: "https://dedev.io/",
            icon_url: "https://dedev.io/img/profile.png"
          },
          thumbnail: {
            url: "https://dedev.io/img/profile.png"
          },
          footer: {
            icon_url: "https://dedev.io/img/Hand.gif",
            text: "Made by KNIF#0001"
          },
          fields: [{
              name: "+redeem",
              value: "Use +redeem <key> to get your Customer Role!"
            },
            {
              name: "+website",
              value: "Shows you the website of dedev.io!"
            },
            {
              name: "+help",
              value: "Shows you this help dialog!"
            }
          ],
        }});
      }
      const embed = {
        "url": "https://dedev.io/",
        "color": 13632027,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://dedev.io/img/Hand.gif",
          "text": "Made by KNIF#0001"
        },
        "thumbnail": {
          "url": "https://dedev.io/img/profile.png"
        },
        "author": {
          "name": "dedev.io",
          "url": "https://dedev.io/",
          "icon_url": "https://dedev.io/img/profile.png"
        },
        "fields": [
          {
            "name": "+buy",
            "value": "Gives you the Info on how to buy Pulse!"
          },
          {
            "name": "+redeem",
            "value": "Use +redeem <key> to get your Customer Role!"
          },
          {
            "name": "+ping",
            "value": "Shows you the ping of this Bot!"
          },
          {
            "name": "+invite",
            "value": "Shows you the invite link of this Bot!"
          },
          {
            "name": "+website",
            "value": "Shows you the website of dedev.io!"
          },
          {
            "name": "+say",
            "value": "Use +say <message> to let the Bot talk for you!"
          },
          {
            "name": "+avatar",
            "value": "Use +avatar @Username to give you the Profile Pic!"
          },
          {
            "name": "+embed",
            "value": "Use +embed <message> to send an embeded message!"
          },
          {
            "name": "+kick",
            "value": "Kicks a user from this server!"
          },
          {
            "name": "+ban",
            "value": "Bans a user from this server!"
          },
          {
            "name": "+generate",
            "value": "Generates Role Keys for Customer. Use +generate <number>!"
          },
          {
            "name": "+help",
            "value": "Shows you this help dialog!"
          }
        ]
      };
      message.channel.send({ embed });
    }
})

bot.on('guildMemberAdd', member => {
    if (member.guild.id !== serverStats.guildID) return;
    bot.channels.get(serverStats.totalUsersID).setName(`Total Users: ${member.guild.memberCount}`);
});

bot.on('guildMemberRemove', member => {
    if (member.guild.id !== serverStats.guildID) return;
    bot.channels.get(serverStats.totalUsersID).setName(`Total Users: ${member.guild.memberCount}`);
});

bot.login(config.token);