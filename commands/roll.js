const Utils = require('../modules/diceutils.js');

exports.run = (client, message, args) => {
    message.reply(Utils.DieRoll(args[0], client, message));
}



