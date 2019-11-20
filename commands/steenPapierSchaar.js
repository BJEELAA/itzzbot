const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const fortnite = require("fortnite");
const apiKey = require("../key.json");
const mysql = require("mysql");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, prefix) => {

    // PREFIXsps steen/papier/schaar

    if(!args[0]) return message.reply(`Gebruik: ${prefix}sps steen/papier/schaar`);

    var options = ["steen", "papier", "schaar"];

    var result = options[Math.floor(Math.random() * options.length)];

    if(args[0] == "steen"){

        if(result == "papier"){

            message.channel.send(`Ik heb ${result} :notepad_spiral:, ik win!`);

        }else if(result == "schaar"){

            message.channel.send(`Ik heb ${result} :scissors:, jij wint! :<`);

        }else if(result == "steen"){

            message.channel.send(`Ik heb ook ${result} :moyai:, het is gelijkspel!`);

        }

    }

    if(args[0] == "papier"){

        if(result == "schaar"){

            message.channel.send(`Ik heb ${result} :scissors:, ik win!`);

        }else if(result == "steen"){

            message.channel.send(`Ik heb ${result} :moyai:, jij wint! :<`);

        }else if(result == "papier"){

            message.channel.send(`Ik heb ook ${result} :notepad_spiral:, het is gelijkspel!`);

        }

    }

    if(args[0] == "schaar"){

        if(result == "steen"){

            message.channel.send(`Ik heb ${result} :moyai:, ik win!`);

        }else if(result == "papier"){

            message.channel.send(`Ik heb ${result} :notepad_spiral:, jij wint! :<`);

        }else if(result == "schaar"){

            message.channel.send(`Ik heb ook ${result} :scissors:, het is gelijkspel!`);

        }

    }

}

module.exports.help = {

    name: "sps"

}