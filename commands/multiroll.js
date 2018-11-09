const Utils = require('../modules/diceutils.js');
const Discord = require("discord.js");

exports.run = (client, message, args) => {
    for (let i = 0; i < parseInt(args[0]); i++) {
        message.reply(Utils.DieRoll(args[1], client, message));
    }
}
