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

    var item = "";
    var time;
    var winnerCount;

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("idioot jij mag dit niet lol :>");

    // !giveaway aantal seconden item

    winnerCount = args[0];
    time = args[1]
    item = args.splice(2, args.length).join(" ");

    message.delete();

    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));

    var embed = new discord.RichEmbed()
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setFooter(`Vervalt: ${dateTime}`)
        .setDescription(item);

    var embedSend = await message.channel.send(embed);
    embedSend.react("🎉");

    setTimeout(function() {

        var random = 0;
        var winners = [];
        var inList = false;

        var peopleReacted = embedSend.reactions.get("🎉").users.array();

        for (let i = 0; i < peopleReacted.length; i++) {
            
            if(peopleReacted[i].id == bot.user.id){

                peopleReacted.splice(i, 1);
                continue;

            }
            
        }

        if(peopleReacted.length == 0) return message.channel.send("Niemand heeft gewonnen");

        if(peopleReacted.length < winnerCount) return message.channel.send("Te weinig spelers, niemand heeft gewonnen");
        
        for (let i = 0; i < winnerCount; i++) {
            
            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let y = 0; y < winners.length; y++) {
                
                if(winners[y] == peopleReacted[random]){

                    inList = true;
                    i--;
                    break;

                }
                
            }

            if (!inList){

                winners.push(peopleReacted[random]);

            }
            
        }

        for (let i = 0; i < winners.length; i++) {
            
            message.channel.send("Proficiat" + winners[i] + `! Je hebt **${item}** gewonnen!`);
            
        }
        
    }, time * 1000);

}

module.exports.help = {

    name: "giveaway"

}