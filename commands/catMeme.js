const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const fortnite = require("fortnite");
const apiKey = require("../key.json");
const mysql = require("mysql");
const botConfig = require("../botconfig.json");
const ytdl = require("ytdl-core");
const search = require("yt-search");
const superAgent = require("superagent");

module.exports.run = async (bot, message, args, prefix, options) => {

    var cat;

    cat = await superAgent
    .get("https://aws.random.cat/meow");

    //console.log(dog);

    while(cat.body.file.endsWith(".mp4") || cat.body.file.endsWith(".webm")){

        dog = await superAgent
        .get("https://aws.random.cat/meow");

    }

    var catEmbed = new discord.RichEmbed()
    .setTitle("KAT :cat:")
    .setColor("#008800")
    .setImage(cat.body.file);

    message.channel.send(catEmbed);

}

module.exports.help = {

    name: "cat"

}