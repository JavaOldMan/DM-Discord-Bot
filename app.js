//Made by KNIF#0001

const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();

let cooldown = new Set();
let cdsecs = 60;

var pmsg = config.defaultmsg;
var ptype = parseInt("2");

bot.on('ready',function(){
    console.log("Bot " + bot.user.tag + " is online");
    bot.user.setStatus(config.botstatus)
    bot.user.setPresence({ game: { name: pmsg, type: ptype } });
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
                color: 1,
                description: `Sorry ${message.author.toString()}, only <@${config.yourid}> can use me!`
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

    if(command === "msg") {
        if (message.author.id !== config.yourid){
            return message.channel.send({embed: {
                color: 1,
                description: `Sorry ${message.author.toString()}, only <@${config.yourid}> can use me!`
            }});
        }else{
            const sayMessages = args.join(" ");
            message.channel.send({embed: {
                color: 1,
                description: "Message set to " + '"' + sayMessages + '"',
            }});
            pmsg = sayMessages;
            bot.user.setPresence({ game: { name: pmsg, type: ptype } });
        } 
    }

    if(command === "type") {
        if (message.author.id !== config.yourid){
            return message.channel.send({embed: {
                color: 1,
                description: `Sorry ${message.author.toString()}, only <@${config.yourid}> can use me!`
            }});
        }else{
            const sayMessagess = args.join(" ");
            if(sayMessagess == "1" || sayMessagess == "2" || sayMessagess == "3"){
                message.channel.send({embed: {
                    color: 1,
                    description: "Type set to " + sayMessagess,
                }});
                ptype = parseInt(sayMessagess);
                bot.user.setPresence({ game: { name: pmsg, type: ptype } });
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
                    name: "dm",
                    value: `Sends a DM to <@${config.yourid}>`
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
                    value: "says something as KNIF bot"
                  },
                  {
                    name: "msg",
                    value: "sets the message of the bot"
                  },
                  {
                    name: "type",
                    value: "sets the type of the msg"
                  },
                  {
                      name: "dm",
                      value: `Sends a DM to <@${config.yourid}>`
                  }
                ]
            }});
        } 
    }

    if(command === "dm"){
        if(cooldown.has(message.author.id)){
            message.delete();
            message.channel.send({embed: {
                color: 16745984,
                description: `:warning: You have to wait ${cdsecs} seconds between commands!`,
            }});
        }else{
            if(args.join(" ") !== ""){
                bot.users.get(config.yourid).send("New message from **" + message.author.tag + `** (${message.author.id}): *` + args.join(' ') + "*");
                message.channel.send({embed: {
                    color: 65286,
                    description: `:white_check_mark: Your message to <@${config.yourid}> has been successfully sent.`,
                }});
                message.delete();
                cooldown.add(message.author.id);
                return;
            }else{
                message.channel.send({embed: {
                    color: 16711685,
                    description: `:no_entry_sign: Please enter a message to <@${config.yourid}>!`,
                }});
                message.delete();
                return;
            }
        }
    }

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdsecs * 1000)
})

bot.login(config.token);