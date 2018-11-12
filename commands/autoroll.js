const Discord = require("discord.js");
const Utils = require('../modules/utils.js');
const DiceUtils = require('../modules/diceutils.js');

exports.run = (client, message, args) => {
    var fs = require('fs');
    const json = JSON.parse(fs.readFileSync('./json/autorolls.json', 'utf8'));
    var whatToRoll = Ucfirst(args[0]);
    var dice = 0;
    switch (whatToRoll) {
        case "Misfire":
        dice = DiceUtils.Straight(1, 10);
            break;
        case "Primal":
        dice = DiceUtils.Straight(2, 10);
            break;
        case "Sanity":
        dice = DiceUtils.Straight(1, 8);
            break;
        case "Long":
        dice = DiceUtils.Straight(1, 20);
            break;
        case "Minor":
        dice = DiceUtils.Straight(1, 10);
            break;
        case "Major":
        dice = DiceUtils.Straight(1, 10);
            break;
        case "Supreme":
        dice = DiceUtils.Straight(1, 10);
            break;
        default:
            break;
    }
    var dice = DiceUtils.Straight(1, 10);
    var targetObj = json[whatToRoll][dice - 1];
    var targetName = Object.values(targetObj);
    message.reply(`\n Rolled:** ${dice}** \n${targetName}`);
}

