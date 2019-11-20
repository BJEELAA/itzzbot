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

    search(args.join(' '), function (err, res) {

        if (err) return message.channel.send('**404** error error bliep bloep blap **404**');

        var videos = res.videos.slice(0, 10);

        var response = '';

        for (var i in videos) {

            response += `**${parseInt(i) + 1}** - ${videos[i].title} \r\n`;

        }

        response += `\nKies een nummer tussen 1 en ${videos.length}`;

        message.channel.send(response);

        const filter = music => !isNaN(music.content) && music.content < videos.length && music.content > 0;

        const collection = message.channel.createMessageCollector(filter);

        collection.videos = videos;

        collection.once('collect', function (music) {

            var commandFile = require("./play.js");

            commandFile.run(bot, message, [this.videos[parseInt(music.content) - 1].url], prefix, options);

        });

    });

}

module.exports.help = {

    name: "search"

}