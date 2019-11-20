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

    var dog;

    dog = await superAgent
    .get("https://random.dog/woof.json");

    //console.log(dog);

    while(dog.body.url.endsWith(".mp4") || dog.body.url.endsWith(".webm")){

        dog = await superAgent
        .get("https://random.dog/woof.json");

    }

    var dogEmbed = new discord.RichEmbed()
    .setTitle("HOND :dog:")
    .setColor("#880000")
    .setImage(dog.body.url);

    message.channel.send(dogEmbed);

}

module.exports.help = {

    name: "dog"

}