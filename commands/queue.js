const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const fortnite = require("fortnite");
const apiKey = require("../key.json");
const mysql = require("mysql");
const botConfig = require("../botconfig.json");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, prefix, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("Er zijn geen liedjes aan het spelen op dit moment");

    var queue = guildIDData.queue;
    var nowPlaying = queue[0];

    var response = `Nu aan het spelen: ${nowPlaying.songTitle} | Aangevraagd door ${nowPlaying.requester} \n\n Queue \n`;

    for (var i = 0; i < queue.length; i++) {

        response += `${i + 1} - ${queue[i].songTitle} | Aangevraagd door ${queue[i].requester}\n`;

    }

    message.channel.send(response);

}

module.exports.help = {

    name: "queue"

}