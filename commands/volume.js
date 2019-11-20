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

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Je bent niet in het zelfde kanaal als de bot");

    if(isNaN(args[0]) || args[0] < 0 || args[0] > 150) return message.channel.send("Gelieve een nummer tussen 0 en 150 mee te geven :>");

    guildIDData.dispatcher.setVolume(args[0] / 100);

    return message.channel.send(`Het volume is aangepast naar ${args[0]}`);

}

module.exports.help = {

    name: "volume"

}