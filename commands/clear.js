const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Volgens mij mag jij dit niet ;)");

    if (!args[0]) return message.reply("Geef een aantal op");

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] == 0) {

                message.reply("Ik kan toch geen nul berichten verwijderen").then(msg => msg.delete(3000));

            } else if (args[0] == 1) {

                message.reply(`Ik heb 1 bericht verwijderd`).then(msg => msg.delete(3000));

            } else {

                message.reply(`Ik heb ${args[0]} berichten verwijderd`).then(msg => msg.delete(3000));

            }

        });

    } else {
        return message.reply("Geef een getal mee (bijv. 21)");
    }

}

module.exports.help = {

    name: "clear"

}