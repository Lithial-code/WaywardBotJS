const Discord = require("discord.js");
const Utils = require('../modules/utils.js');

exports.run = (client, message, args) => {
    var target = "";
    var fs = require('fs');
    const json = JSON.parse(fs.readFileSync('./json/races.json', 'utf8'));

    args.forEach(element => {
        target += element + " ";
    });

    target = target.toLowerCase().trim();
    if (args[0] == '*') {
        message.channel.send(Utils.EmbedList(client, json));
    }
    else {
        var results = Utils.FuzzySort(target, json);

        if (results.length <= 0) {
            message.channel.send(Utils.ErrorWrong(client));
            return;
        }
        if (results[0].obj.name.toLowerCase() == target) {
            message.channel.send(EmbedMessage(client, results[0].obj));
        }
        else {
            message.channel.send(Utils.DidYouMeanEmbed(client,
                Utils.SearchMessage(results)));
            var id;
            const collector = new Discord.MessageCollector(message.channel,
                m => m.author.id === message.author.id, { time: 10000 });
            collector.on('collect', message => {
                id = parseInt(message) - 1;
                //everything has to be done in here apparently
                if (id >= results.length) {
                    message.channel.send(Utils.ErrorWrongNumber(client));
                }
                else {
                    message.channel.send(EmbedMessage(client, results[id].obj));
                }
            });
        }
    }

    function EmbedMessage(client, target) {
        console.log(target.type);
        if (target.type != null || target.type != "") {
            const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setFooter("© Lelantos Studios", client.user.avatarURL)
                .setTimestamp()
                .addField("Type: ", target.name)
                .addField("Races Allowed", target.race)
                .addField("Stat Bonus", target.stat)
                .addField("Flaw", target.flaw)
                .addField("Bonus", target.bonus);
            return embed;
        }
        else {
            const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setFooter("© Lelantos Studios", client.user.avatarURL)
                .setTimestamp()
                .addField("Race: ", target.name)
                .addField("Race Bonus", target.stat)
                .addField("Subrace Bonus", target.substat)
                .addField("Skills Bonus", target.skill)
                .addField("Flaw", target.flaw)
                .addField("Bonus", target.bonus);
            return embed;
        }
    }
}