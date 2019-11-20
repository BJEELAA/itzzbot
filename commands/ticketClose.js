const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    const categorieId = "582171406759100416";

    if(message.channel.parentID == categorieId){

        message.channel.delete();

    }else{

        message.reply("Gelieve dit commando in een ticket kanaal te doen");

    }

}

module.exports.help = {

    name: "close"

}