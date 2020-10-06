const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const fortnite = require("fortnite");
const apiKey = require("../key.json");
const mysql = require("mysql");
const botConfig = require("../botconfig.json");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, prefix, options) => {

    if (!message.member.voiceChannel) return message.channel.send("Je moet in een spraakkanaal zitten");

    // if (message.guild.me.voiceChannel) return message.channel.send("Sorry, de bot is al geconnect met een ander kanaal");

    if (!args[0]) return message.channel.send("Gelieve een URL mee te geven");

    var validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send("Geef een geldige YT URL mee");

    var info = await ytdl.getInfo(args[0]);

    
    var data = options.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voiceChannel.join();

    if(!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({

        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id

    });

    if(!data.dispatcher){

        Play(bot, options, data);

    }else message.channel.send(`Toegevoegd aan de queue: ${info.title}`);
    
    //might wanna optimize this bit for the new update of ytdl
    
    options.active.set(message.guild.id, data);

}

async function Play(bot, options, data){

    bot.channels.get(data.queue[0].announceChannel).send(`Nu aan het spelen: ${data.queue[0].songTitle} - Aangevraagd door: ${data.queue[0].requester}`);
    
    //new default bitr is 12950, might wanna change so we dont light their servers on fire
    
    var option = { seek:2, volume:1, bitrate:12800 };

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: "audioonly"}), option);
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function(){

        Finish(bot, options, this);

    });

}

function Finish(bot, options, dispatcher) {

    var fetchedData = options.active.get(dispatcher.guildID);

    fetchedData.queue.shift();

    if(fetchedData.queue.length > 0){

        options.active.set(dispatcher.guildID, fetchedData);

        Play(bot, options, fetchedData);

    }else{

        options.active.delete(dispatcher.guildID);

        var voiceChannel = bot.guilds.get(dispatcher.guildID).me.voiceChannel;

        if(voiceChannel) voiceChannel.leave();

    }

}

module.exports.help = {

    name: "play"

}
