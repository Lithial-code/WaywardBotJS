const Discord = require("discord.js");
exports.MultiRoll = (numberOfRolls, dieSpec, total, client, message) => {
    if (numberOfRolls == "" || numberOfRolls == null || dieSpec == "" || dieSpec == null) {
        return "This dice format is invalid. Please try again";
    }
    var rollTotal = "";
    var passOutTotal = 0
    if (parseInt(numberOfRolls) <= 20) {
        for (let i = 0; i < parseInt(numberOfRolls); i++) {
            var addToTotal = this.DieRoll(dieSpec, client, message);
            rollTotal += addToTotal + "\n";
            passOutTotal += parseInt(addToTotal.slice(-2));
        }
        if (total) {
            return `\n ${rollTotal} \n For a total of : **${passOutTotal}**`;
        }
        else {
            return "\n" + rollTotal;
        }
    }
    else {
        return "This dice format is invalid. Please try again";
    }
}
exports.DieRoll = (dieSpec, client, message) => {
    var match = /^(\d+?)?d(\d+)([a-zA-Z!]?[a-zA-Z!]?)(.?)(\d+?)?$/.exec(dieSpec);
    if (!match) {
        return "This dice format is invalid. Please try again";
    }
    if (!match && numberOfRolls > 1) {
        return "This dice format is invalid. Please try again";
    }
    var number = (typeof match[1] == 'undefined') ? 1 : parseInt(match[1]);
    var sides = parseInt(match[2]);
    var optional = match[3].toString();
    var dmas = match[4].toString();
    var modifier = (typeof match[4] == 'undefined') ? 0 : parseInt(match[5]);
    var mover = [number, sides, dmas, modifier, optional];

    var dicerolls = [];
    var strikeout = [];
    var total = 0;
    var dicestring = "";
    var strikeoutstring = "";


    for (let i = 0; i < number; i++) {
        var roll = RollDice(sides);
        dicerolls.push(roll);
    }

    switch (optional) {

        case "dl":
            dicerolls = DiceSortDescending(dicerolls, strikeout);
            break;
        case "dh":
            dicerolls = DiceSortAscending(dicerolls, strikeout);
            break;
        case "kh":
            dicerolls = DiceSortDescending(dicerolls, strikeout);
            break;
        case "kl":
            dicerolls = DiceSortAscending(dicerolls, strikeout);
            break;
        case "d":
            dicerolls = DiceSortDescending(dicerolls, strikeout);
            break;
        case "k":
            dicerolls = DiceSortDescending(dicerolls, strikeout);
            break;

        case "!":
            dicerolls.forEach(element => {
                if (element == sides) {
                    var roll = RollDice(sides);
                    dicerolls.push(roll);
                }
            });
            break;
        default:
            break;
    }

    if (strikeout.length != 0) {
        for (let j = 0; j < strikeout.length; j++) {
            const element = strikeout[j];
            strikeoutstring += element;
            if (j != (number - 1)) {
                dicestring += ",";
            }
        }
    }

    for (let i = 0; i < dicerolls.length; i++) {
        const element = dicerolls[i];
        if (element == sides) {
            dicestring += "**" + element + "**";
        }
        else {
            dicestring += element;
        }
        total += element;
        if (i != (dicerolls.length - 1)) {
            dicestring += ",";
        }
    }

    switch (dmas.toString()) {
        case "+": total += modifier;

            break;
        case "-": total -= modifier;

            break;
        case "*": total *= modifier;

            break;
        case "/": total /= modifier;

            break;
        default:
            break;
    }
    var finalstring = dicestring.replace(/^,|/g, '');
    var strikeoutstring = ",~~" + strikeoutstring + "~~";
    console.log(`strikout string is ${strikeoutstring}`);
    if (dmas == "" || dmas === null) {
        dmas = " ";
        modifier = " ";
        mover[2] = " ";
        mover[3] = " ";
    }
    return EmbedMessage(client, finalstring, total, mover, strikeoutstring);
}
exports.Straight = (num, sides) =>
{
    num --;
    var dice = 0;
    for (let i = 0; i <= num; i++) {
        var rolled = Math.floor(Math.random() * sides) + 1;
        console.log(rolled);
        dice += parseInt(rolled);
    }
    
    return dice;
}
function RollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function DiceSortDescending(dicerolls, strikeout) {
    dicerolls.sort(function (a, b) { return b - a });
    strikeout.push(dicerolls[dicerolls.length - 1]);
    dicerolls.pop();
    return dicerolls;
}
function DiceSortAscending(dicerolls, strikeout) {
    dicerolls.sort(function (a, b) { return a - b });
    strikeout.push(dicerolls[dicerolls.length - 1]);
    dicerolls.pop();
    return dicerolls;
}
function DiceError(client) {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error: ", "This dice format is invalid. Please try again");
    return embed;
}

function EmbedMessage(client, finalstring, total, mover, strikeoutstring) {
    var strikeEmbed = strikeoutstring;
    if (strikeEmbed == ",~~~~") {
        strikeEmbed = "";
    }
    var message = "";
    var toEmbed = finalstring + strikeEmbed;
    message += (`**Result: **${mover[0]}d${mover[1]}(${toEmbed})${mover[2]} ${mover[3]}`);
    message += (`\n**Total: ** ${total}`);
    return message;
}
exports.ToManyRollsEmbed = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error: ", "You rolled too many dice. Current cap is 20 per roll");
    return embed;
}