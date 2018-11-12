const Utils = require('../modules/diceutils.js');

exports.run = (client, message, args) => {
    var str = Utils.MultiRoll(args[0],args[1],false,client,message);
    message.reply(str);
}
