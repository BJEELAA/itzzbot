const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij mag dit niet doen :<");

    var user = message.guild.member(message.mentions.users.first());

    if(!user) return message.channel.send(`Gebruik: ${prefix}tempban gebruiker tijd reden`);

    if(user.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, je mag deze persoon niet tempbannen");

    var banTime = args[1];

    //var reason = args.join(" ").slice(22);

    var reason = args[2]

    if(!reason) return message.reply("Geef een reden op");

    if(ms(banTime)){

        await message.guild.member(user).ban(reason);

        message.channel.send(`${user} is gebanned voor ${banTime} met reden ${reason}`);

        setTimeout(function(){

            message.guild.unban(user.id);

            message.channel.send(`${user} is geunbanned`);

        }, ms(banTime));

    }else return message.reply("Geef een juiste tijd op");

}

module.exports.help = {

    name: "tempban"

}