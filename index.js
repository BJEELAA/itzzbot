const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {

        console.log("Geen files gevonden");

        return;

    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);

        console.log(`De file ${f} is ingeladen!`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity(`met zijn lul`, { type: "PLAYING" });

});

bot.on("guildMemberAdd", member => {

    var rankNameText = "Standard"

    var rank = member.guild.roles.find("name", rankNameText);

    if (!rank) return;

    member.addRole(rank);

    const welcomeChannel = member.guild.channels.find("name", "welkom-en-vaarwel");

    if (!welcomeChannel) return;

    welcomeChannel.send(`Welkom bij de server **${member}**`);

});

bot.on("guildMemberRemove", member => {

    const leaveChannel = member.guild.channels.find("name", "welkom-en-vaarwel");

    if (!leaveChannel) return;

    leaveChannel.send(`Snik, **${member}** heeft onze server verlaten :<`);

});

// var swearWords = ["fuck", "kanker", "kkr", "fock", "fack", "sex", "porn", "porno", "neuken", "pornhub", "piemel", "new swearwords here :>"];

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if (!prefixes[message.guild.id]) {

        prefixes[message.guild.id] = {

            prefixes: botConfig.prefix

        };

    }

    var prefix = prefixes[message.guild.id].prefixes;

    // var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    //console.log(command);

    var givenPrefix = command.charAt(0);

    if (givenPrefix === '/') {

        var commands = bot.commands.get(command.slice(prefix.length));

        var options = {

            active: active

        }

        if (commands) commands.run(bot, message, args, prefix, options);


    } else return console.log('Verkeerde prefix >_<');




    // var msg = message.content.toLowerCase();

    // for (var i = 0; i < swearWords.length; i++) {

    //     if (msg.includes(swearWords[i])) {

    //         message.delete();

    //         return message.reply("Gelieve niet te vloeken").then(msg => msg.delete(3000));

    //     }

    // }




    // var swearWords = JSON.parse(fs.readFileSync("./data/swearwords.json"));

    // var msg = message.content.toLowerCase();

    // for (var i = 0; i < swearWords["vloekwoorden"].length; i++) {

    //     if (msg.includes(swearWords["vloekwoorden"][i])) {

    //         message.delete();

    //         return message.reply("Gelieve niet te vloeken").then(msg => msg.delete(3000));

    //     }

    // }


    if (!commands) {

        var swearWords = JSON.parse(fs.readFileSync("./data/swearwords.json"));

        var sentenceUser = "";

        var amountSwearwords = 0;

        for (var y = 0; y < messageArray.length; y++) {

            var changeWord = "";

            for (var i = 0; i < swearWords["vloekwoorden"].length; i++) {

                var word = messageArray[y].toLowerCase();

                if (word == swearWords["vloekwoorden"][i]) {

                    changeWord = word.replace(swearWords["vloekwoorden"][i], "****");

                    sentenceUser = sentenceUser + " " + changeWord;

                    amountSwearwords++;

                }

            }

            if (!changeWord) {

                sentenceUser = sentenceUser + " " + messageArray[y];

            }

        }

        if (amountSwearwords != 0) {

            message.delete();

            message.channel.send(sentenceUser);
            message.reply("Niet vloeken A.U.B.!")

        }

    }

});

bot.login(botConfig.token);