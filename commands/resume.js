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

    if(message.member.voiceChannel != message.guild.me.voiceChannel) return message.channel.send("Je bent niet in het zelfde kanaal als de bot");

    if(!guildIDData.dispatcher.paused) return message.channel.send(`De muziek is niet gepauzeerd, doe ${prefix}pauze om te pauzeren`);

    guildIDData.dispatcher.resume();

    return message.channel.send(`Gehervat: ${guildIDData.queue[0].songTitle}`);

}

module.exports.help = {

    name: "hervat"

}