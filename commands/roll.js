const Utils = require('../modules/diceutils.js');
const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.reply(Utils.DieRoll(args[0], client, message));
}



