const Discord = require("discord.js");

exports.run = (client, message, args) => {
    dieRoll(args[0], client, message);



    function dieRoll(dieSpec, client, message) {
        var match = /^(\d+?)?d(\d+)([a-zA-Z!][a-zA-Z!]?)(.?)(\d+?)?$/.exec(dieSpec);
        if (!match) {
            throw "Invalid dice notation: " + dieSpec;
        }

        var number = (typeof match[1] == 'undefined') ? 1 : parseInt(match[1]);
        var sides = parseInt(match[2]);
        var optional = match[3].toString();
        var dmas = match[4].toString();
        var modifier = (typeof match[4] == 'undefined') ? 0 : parseInt(match[5]);
        var mover = [number, sides, dmas, modifier, optional];
        var dicerolls = [];
        var total = 0;
        var dicestring = "";
        var strikeoutstring = "";
        var strikeout = [];

        for (let i = 0; i < number; i++) {
            var roll = Math.floor(Math.random() * sides) + 1;
            dicerolls.push(roll);
        }
        switch (optional) {

            //TODO check strikeout array
            case "dl":
                dicerolls.sort(function (a, b) { return b - a });
                strikeout.push(dicerolls[dicerolls.length - 1]);
                dicerolls.pop();
                //dicestring += roll.toString();
                break;
            case "dh":
                dicerolls.sort(function (a, b) { return a - b });
                strikeout.push(dicerolls[dicerolls.length - 1]);
                dicerolls.pop();
                //dicestring += roll.toString();
                break;
            //TODO check strikeout array
            case "kh":
                dicerolls.sort(function (a, b) { return b - a });
                strikeout.push(dicerolls[dicerolls.length - 1]);
                dicerolls.pop();
                //dicestring += roll.toString();
                break;
            case "kl":
                dicerolls.sort(function (a, b) { return a - b });
                strikeout.push(dicerolls[dicerolls.length - 1]);
                dicerolls.pop();
                //dicestring += roll.toString();
                break;
            case "!":
                dicerolls.forEach(element => {
                    // console.log("element:" + element);
                    // console.log("Side:" + sides);
                    if (element == sides) {
                        var roll = Math.floor(Math.random() * sides) + 1;
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
        var finalstrikeoutstring = ",~~" + strikeoutstring + "~~";
        console.log(finalstring);
        console.log(total);
        if (dmas == "" || dmas === null) {
            dmas = " ";
            modifier = " ";
            mover[2] = " ";
            mover[3] = " ";
        }
        if (strikeout.length == 0) {
            embedMessage(finalstring, total, mover, client, message);

        }
        else {
            embedMessagestrike(finalstring, total, mover, finalstrikeoutstring, client, message);

        }
    }
}

function embedMessage(finalstring, total, mover, client, message) {
    const embed = new Discord.RichEmbed()
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        .addField("Result: ", mover[0] + "d" + mover[1] + " (" + finalstring + ") " + mover[2] + " " + mover[3])
        .addField("Total: ", total)


    message.channel.send({ embed });
}
function embedMessagestrike(finalstring, total, mover, strikeoutstring, client, message) {
    const embed = new Discord.RichEmbed()
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        .addField("Result: ", mover[0] + "d" + mover[1] + " (" + finalstring + strikeoutstring + ") " + mover[2] + " " + mover[3])
        .addField("Total: ", total)


    message.channel.send({ embed });
}

