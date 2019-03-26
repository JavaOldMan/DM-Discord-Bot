//Made by Maurice Huber [KNIF#0001] for mauricehuber.com

const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();

let cooldown = new Set();
let cdsecs = parseInt(config.cooldown);

var pmsg = config.defaultmsg;
var ptype = parseInt(config.type);

bot.on('ready',function(){
    console.log("Bot " + bot.user.tag + " is online");
    bot.user.setPresence({ status: config.status, game: { name: pmsg, type: ptype } });
})

bot.on("message", (message) => {
    if(message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.content === `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`) {
        message.channel.send({embed: {
            color: 16745984,
            description: `:warning: Hello! Please type **-help**!`,
        }});
        message.delete();
        return;
    }

    if(!message.content.startsWith(config.prefix)) return;

    if(command === "say") {
        if (message.author.id !== config.yourid){
            return message.channel.send({embed: {
                color: 16711685,
                description: `:no_entry_sign: Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`
            }});
        }else{
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{}); 
            message.channel.send({embed: {
                color: 1,
                description: sayMessage,
            }});
        } 
    }

    if(command === "message") {
        if (message.author.id !== config.yourid){
            return message.channel.send({embed: {
                color: 16711685,
                description: `:no_entry_sign: Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`
            }});
        }else{
            const sayMessages = args.join(" ");
            message.channel.send({embed: {
                color: 1,
                description: "Message set to " + '"' + sayMessages + '"',
            }});
            pmsg = sayMessages;
            bot.user.setPresence({ status: config.status, game: { name: pmsg, type: ptype } });
        } 
    }

    if(command === "type") {
        if (message.author.id !== config.yourid){
            return message.channel.send({embed: {
                color: 16711685,
                description: `:no_entry_sign: Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`
            }});
        }else{
            const sayMessagess = args.join(" ");
            if(sayMessagess == "1" || sayMessagess == "2" || sayMessagess == "3"){
                message.channel.send({embed: {
                    color: 1,
                    description: "Type set to " + sayMessagess,
                }});
                ptype = parseInt(sayMessagess);
                bot.user.setPresence({ status: config.status, game: { name: pmsg, type: ptype } });
            }else{
                return message.channel.send({embed: {
                    color: 1,
                    author: {
                        name: "You can either use:"
                      },
                    fields: [{
                        name: "1",
                        value: "playing"
                      },
                      {
                        name: "2",
                        value: "listening"
                      },
                      {
                        name: "3",
                        value: "watching"
                      }
                    ]
                }});
            }
        } 
    }

    if(command === "help") {
        if (message.author.id !== config.yourid){
            return message.channel.send({embed: {
                color: 1,
                author: {
                    name: "Commands:"
                  },
                fields: [{
                    name: config.devmsgcmd,
                    value: `Sends a DM to <@${config.yourid}>`
                  },
                  {
                      name: "msg",
                      value: "Sends a DM to the entered ID"
                  }
                ]
            }});
        }else{
            return message.channel.send({embed: {
                color: 1,
                author: {
                    name: "Commands:"
                  },
                fields: [{
                    name: "say",
                    value: "says something as the bot"
                  },
                  {
                    name: "message",
                    value: "sets the message of the bot"
                  },
                  {
                    name: "type",
                    value: "sets the type of the msg"
                  },
                  {
                      name: config.devmsgcmd,
                      value: `Sends a DM to <@${config.yourid}>`
                  },
                  {
                    name: "dm",
                    value: "Sends a DM to the entered ID"
                  },
                  {
                      name: "ping",
                      value: "Shows the Bots response time"
                  }
                ]
            }});
        } 
    }

    if(command === config.devmsgcmd){
        if(cooldown.has(message.author.id)){
            message.delete();
            message.channel.send({embed: {
                color: 16711685,
                description: `:no_entry_sign: You have to wait ${cdsecs} seconds between each direct message to <@${config.yourid}>!`,
            }});
        }else{
            if(args.join(" ") !== ""){
                try {
                    bot.users.get(config.yourid).send({embed: {
                        color: 1,
                        description: args.join(' '),
                        author: {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL
                        },
                        footer: {
                            text: "ID: " + message.author.id
                        },
                    }});
                    message.channel.send({embed: {
                        color: 65286,
                        description: `:white_check_mark: Your message to <@${config.yourid}> has been successfully sent.`,
                    }});
                    message.delete();
                    cooldown.add(message.author.id);
                    return;
                }
                catch(err) {
                    return message.channel.send({embed: {
                        color: 16711685,
                        description: `:no_entry_sign: ERROR: ` + err.message,
                    }});
                }
            }else{
                message.channel.send({embed: {
                    color: 16745984,
                    description: `:warning: Please enter a message to <@${config.yourid}>!`,
                }});
                message.delete();
                return;
            }
        }
    }

    if(command === "dm"){
        if(args.join(" ") !== ""){
            if(args[0].startsWith("<@") || !args[0].startsWith("0") && !args[0].startsWith("1") && !args[0].startsWith("2") && !args[0].startsWith("3") && !args[0].startsWith("4") && !args[0].startsWith("5") && !args[0].startsWith("6") && !args[0].startsWith("7") && !args[0].startsWith("8") && !args[0].startsWith("9")){
                return message.channel.send({embed: {
                    color: 16745984,
                    description: `:warning: Please enter a valid user id!`,
                }});
            }
            if(args.length == 1){
                return message.channel.send({embed: {
                    color: 16745984,
                    description: `:warning: Please enter a message!`,
                }});
            }
            let to = args[0];
            let msg = args[1];
            for(i=1; i<args.length; i++) {
                if(args[i] != args[1])
                    msg += " " + args[i];
                else
                    msg = args[i];
            }
            try {
                bot.users.get(to).send({embed: {
                    color: 1,
                    description: msg,
                    author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL
                    },
                    footer: {
                        text: "ID: " + message.author.id
                    },
                }});
                message.channel.send({embed: {
                    color: 65286,
                    description: `:white_check_mark: Your message to <@${to}> has been successfully sent.`,
                }});
                return;
            }
            catch(err) {
                return message.channel.send({embed: {
                    color: 16711685,
                    description: `:no_entry_sign: ERROR: ` + err.message,
                }});
            }
        }else{
            return message.channel.send({embed: {
                color: 16745984,
                description: `:warning: Please enter a id and a message!`,
            }});
        }
    }

    if(command === "ping") {
        if (message.author.id !== config.yourid){
            return message.channel.send({embed: {
                color: 16711685,
                description: `:no_entry_sign: Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`
            }});
        }else{
            message.channel.send({embed: {
                color: 1,
                description: `Pong! Latency is ${new Date().getTime() - message.createdTimestamp}ms!`
            }});
        } 
    }

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdsecs * 1000)
})

bot.login(config.token);