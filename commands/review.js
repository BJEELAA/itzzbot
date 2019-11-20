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

    const aantalSterren = args[0];

    if (!aantalSterren || aantalSterren < 1 || aantalSterren > 5) return message.channel.send(`Geef een aantal sterren op tussen 1 en 5`);

    const bericht = args.splice(1, args.length).join(' ') || '**Geen bericht meegegeven**';

    var reviewChannel = message.guild.channels.find("name", "review");

    if (!reviewChannel) return message.channel.send('Review kanaal niet gevonden');

    var sterren = '';

    for (var i = 0; i < aantalSterren; i++) {

        sterren += ':star: ';

    }

    message.delete();

    const review = new discord.RichEmbed()
    .setTitle(`${message.author.username} heeft een review geschreven :tada:`)
    .setColor('#00FF00')
    .setThumbnail("https://m.media-amazon.com/images/M/MV5BNWYxY2RjODYtNzA2OC00ZjFiLThiOTItZDdlZDM1MDE3Yjk0XkEyXkFqcGdeQXVyOTc5Mjg1NDQ@._V1_UY2680_CR9,0,1820,2680_AL_.jpg")
    .addField("Sterren ", `${sterren}`)
    .addField("Review ", `${bericht}`);

    message.channel.send(":white_check_mark: Je review is geplaats");

    return reviewChannel.send(review);

}

module.exports.help = {

    name: "review"

}