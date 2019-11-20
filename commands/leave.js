const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const fortnite = require("fortnite");
const apiKey = require("../key.json");
const mysql = require("mysql");
const botConfig = require("../botconfig.json");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {

    if(!message.member.voiceChannel) return message.channel.send("Gelieve met een spraakkanaal te verbinden");

    if(!message.guild.me.voiceChannel) return message.channel.send("Ik zit niet in een spraakkanaal");

    if(message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send("Je zit niet in het zelfde kanaal als de bot");

    message.guild.me.voiceChannel.leave();

    message.channel.send("Kanaal aan het verlaten...");

}

module.exports.help = {

    name: "leave"

}