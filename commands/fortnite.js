const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const fortnite = require("fortnite");
const apiKey = require("../key.json");

const ft = new fortnite(apiKey.key);

module.exports.run = async (bot, message, args) => {

    var userName = args[0];
    var platform = args[1] || "pc";

    ft.user(userName, platform).then(data => {

        var stats = data.stats.lifetime;

        var kills = stats.kills;
        var wins = stats.wins;
        var matches = stats.matches;
        var kd = stats.kd

        var fortniteStats = new discord.RichEmbed()
        .setTitle("Fortnite stats van ", userName)
        .addField("Kills: ", kills)
        .addField("Wins: ", wins)
        .addField("Matches gespeeld: ", matches)
        .addField("K/D:", kd);

        return message.channel.send(fortniteStats);

    }).catch(err =>{

        console.log(err);
        message.channel.send("**404** error error bliep bloep blap error");

    })

}

module.exports.help = {

    name: "fortnite"

}