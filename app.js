//Made by Maurice Huber [KNIF#0001] for mauricehuber.com

const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();

let cooldown = new Set();
let cdsecs = parseInt(config.cooldown);
let cdmin = cdsecs / 60;

var pmsg = config.defaultmsg;
var ptype = parseInt(config.type);

bot.on('ready',function(){
    console.log("Bot " + bot.user.tag + " is online");
    bot.user.setPresence({ status: config.status, game: { name: pmsg, type: ptype } });
})

bot.on("message", (message) => {
    //Embeded Preset Functions
    function success(input) { message.channel.send({embed: { color: 7778644, description: ":white_check_mark: " + input, }}); }
    function info(input) { message.channel.send({embed: { color: 3835585, description: ":information_source: " + input, }}); }
    function warning(input) { message.channel.send({embed: { color: 16763981, description: ":warning: " + input, }}); }
    function error(input) { message.channel.send({embed: { color: 14101826, description: ":no_entry_sign: " + input, }}); }

    if(message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.content === `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`) {
        info(`Hello, ${message.author.toString()}! Please type **-help** to see all commands!`);
        message.delete();
        return;
    }

    if(!message.content.startsWith(config.prefix)) return;

    if(command === "say") {
        if (message.author.id !== config.yourid){
            return error(`Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`);
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
            return error(`Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`);
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
            return error(`Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`);
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
                      name: "dm",
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
                    value: "Says something as the Bot"
                  },
                  {
                    name: "message",
                    value: "Sets the message of the Bot"
                  },
                  {
                    name: "type",
                    value: "Sets the type of the msg"
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
                  },
                  {
                    name: "success",
                    value: "Sends a success message"
                  },
                  {
                    name: "info",
                    value: "Sends a info message"
                  },
                  {
                    name: "error",
                    value: "Sends a error message"
                  },
                  {
                    name: "warning",
                    value: "Sends a success message"
                  },
                ]
            }});
        } 
    }

    if(command === config.devmsgcmd){
        if(cooldown.has(message.author.id)){
            message.delete();
            error(`You have to wait ${cdmin} minutes between each direct message to <@${config.yourid}>!`);
            return;
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
                    success(`Your message to <@${config.yourid}> has been sent successfully.`);
                    info(`He will reply as quickly as possible, please give him time to do!`);
                    message.delete();
                    cooldown.add(message.author.id);
                    return;
                }
                catch(err) {
                    return error(`ERROR: ` + err.message);
                }
            }else{
                warning(`Please enter a message to <@${config.yourid}>!`);
                message.delete();
                return;
            }
        }
    }

    if(command === "dm"){
        if(args.join(" ") !== ""){
            if(args[0].startsWith("<@") || !args[0].startsWith("0") && !args[0].startsWith("1") && !args[0].startsWith("2") && !args[0].startsWith("3") && !args[0].startsWith("4") && !args[0].startsWith("5") && !args[0].startsWith("6") && !args[0].startsWith("7") && !args[0].startsWith("8") && !args[0].startsWith("9")){
                return warning("Please enter a valid user id!");
            }
            if(args.length == 1){
                return warning("Please enter a message!");
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
                success(`Your message to <@${to}> has been successfully sent.`);
                return;
            }
            catch(err) {
                return error(`ERROR: ` + err.message);
            }
        }else{
            return warning(`Please enter a id and a message!`);
        }
    }

    if(command === "success") {
        if (message.author.id !== config.yourid){
            return error(`Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`);
        }else{
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{}); 
            success(sayMessage);
        } 
    }

    if(command === "error") {
        if (message.author.id !== config.yourid){
            return error(`Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`);
        }else{
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{}); 
            error(sayMessage);
        } 
    }

    if(command === "info") {
        if (message.author.id !== config.yourid){
            return error(`Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`);
        }else{
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{}); 
            info(sayMessage);
        } 
    }

    if(command === "warning") {
        if (message.author.id !== config.yourid){
            return error(`Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`);
        }else{
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{}); 
            warning(sayMessage);
        } 
    }

    if(command === "ping") {
        if (message.author.id !== config.yourid){
            return error(`Sorry ${message.author.toString()}, only <@${config.yourid}> can use this command!`);
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