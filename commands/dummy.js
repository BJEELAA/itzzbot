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

    return console.log(`${message.author.tag} voerde het DUMMY command uit...`);

}

module.exports.help = {

    name: "dummy"

}