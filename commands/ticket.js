const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    const categorieId = "582171406759100416";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var bool = false;

    message.guild.channels.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.reply("Je hebt al een ticket");

            bool = true;

        }

    });

    if (bool == true) return;

    var ticketCreateEmbed = new discord.RichEmbed()
        .setTitle("Hoi, " + userName)
        .setFooter("Support kanaal wordt aangemaakt");

    message.channel.send(ticketCreateEmbed)

    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {

        createdChan.setParent(categorieId).then((settedParent) => {

            settedParent.overwritePermissions(message.guild.roles.find(`name`, "@everyone"), { "READ_MESSAGES": false });

            settedParent.overwritePermissions(message.author, {

                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true

            });

            var ticketStartEmbed = new discord.RichEmbed()
                .setTitle("Hoi, " + userName)
                .setDescription("Zet hier je vraag/bericht");

            settedParent.send(ticketStartEmbed);

        }).catch(err => {

            message.channel.send("**404** bliep bloep blap error error :>");

        });

    }).catch(err => {

        message.channel.send("**404** bliep bloep blap error error :>");

    });

}

module.exports.help = {

    name: "ticket"

}