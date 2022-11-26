const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, DiscordAPIError } = require('discord.js'); //Import the most important functions from discord.js
const Discord = require('discord.js'); //v12.5.3
require('discord-inline-reply'); //Import inline replies
const client = new Client(); //New Discord client
const botconfig = require('./data/botconfig.json') //Login info for the bot, you will have to provide your own info there

client.on("ready", () => {
  console.log(`The bot is online!`)

  client.user.setPresence({ status: 'dnd' });
});

client.on("message", async (message) => {
    const DetectMessageType = require('./functions/!DetectMessageType.js')
    const ChatAI = require('./functions/cleverbot.js')
    const AI = require('./functions/AI.js')
    const Help = require('./functions/Help.js')
    
    if(message.author.id === client.user.id){ 
        return; //Stop the event if a message is sent by the bot.
    }
    if (message.content.includes("@everyone")) {
        return; //Stop the event if a message includes @everyone ping.
    }
    if (message.content.includes("@here")) {
        return; //Stop the event if a message includes @here ping.
    }

    if (message.content.includes("!shelp")){
        return Help(message, message.author, message.guild, client)
    }

    if (message.mentions.has(client.user)) { //Continue if a message mentioned the bot.
        return DetectMessageType(message, message.author, message.guild, client)
    }

    if (message.channel.name.includes('sexbot-ai')){
        return ChatAI(message, message.author, message.guild, client)
    }

    if (message.channel.name.includes('sexbot-chat')){
        var response = await AI(message.content,message.author.username)

        if(message.guild){
            message.channel.startTyping();
            setTimeout(function(){
                message.channel.stopTyping();
                return message.lineReply(response)
            }, 2000);
        } else {
            message.channel.startTyping();
            setTimeout(function(){
                message.channel.stopTyping();
                return message.channel.send(response)
            }, 2000);
        }
    }
});

client.login(botconfig.token)