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

    var amountUsers = message.member.voiceChannel.members.size;

    var amountSkip = Math.ceil(amountUsers / 2);

    if(!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    if(guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Je hebt al eens gevote om te skippen. ${guildIDData.queue[0].voteSkips.length}/${amountSkip} votes`);

    guildIDData.queue[0].voteSkips.push(message.member.id);

    options.active.set(message.guild.id, guildIDData);

    if(guildIDData.queue[0].voteSkips.length >= amountSkip){

        message.channel.send("Opweg naar het volgende liedje");

        return guildIDData.dispatcher.emit("end");

    }

    message.channel.send(`Skip-vote geregistreerd. ${guildIDData.queue[0].voteSkips.length}/${amountSkip} votes `);

}

module.exports.help = {

    name: "skip"

}