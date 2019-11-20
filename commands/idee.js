const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const fortnite = require("fortnite");
const apiKey = require("../key.json");
const mysql = require("mysql");
const botConfig = require("../botconfig.json");
const ytdl = require("ytdl-core");
const search = require("yt-search");

module.exports.run = async (bot, message, args, prefix, options) => {

    var idee = args.join(' ');
    if(!idee) return message.channel.send("Geen idee meegegeven, gelieve een idee mee te geven");

    var ideeEmbed = new discord.RichEmbed()
    .setThumbnail(message.author.displayAvatarURL)
    .setTitle(`Idee van ${message.author.username}`)
    .setColor('00FF00')
    .addField('Idee:', idee);

    var ideeChannel = message.guild.channels.find("name", "idee");

    if(!ideeChannel) return message.channel.send("Kanaal niet gevonden");

    message.delete();

    message.channel.send(":white_check_mark: Je idee is verzonden");

    ideeChannel.send(ideeEmbed).then(embedMessage => {

        embedMessage.react('👍');
        embedMessage.react('👎');

    });

}

module.exports.help = {

    name: "idee"

}