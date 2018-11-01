const Discord = require("discord.js");
exports.run = (client, message, args) => {
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./json/items.json', 'utf8'));
    if (args[0] == '*') {
        embedList();
    } else {


        var target = "";
        args.forEach(element => {
            target += element + " ";
        });
        var targettrim = target.trim();
        var found = false;
        for (var i = 0; i < json.length; i++) {
            if (json[i].name.toLowerCase().includes(targettrim.toLowerCase())) {
                found = true;
                if (json[i].itemtype == "Weapon") {
                    console.log("Weapon");
                    embedWeaponMessage(json[i]);
                } else
                    if (json[i].itemtype == "Armor") {
                        console.log("Armor");
                        embedArmorMessage(json[i]);
                    }
                    else {
                        console.log("broken");
                    }
                break;
            }
        }
    }
    //
    //method for making list of names
    //
    function embedList() {
        var list = "";
        json.forEach(element => {
            list += element.name + '\n';
        });

        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list)
        message.channel.send({ embed });
    }

    //
    //fuctions to create item embed. are split into weapons and armor
    //
    function embedWeaponMessage(target) {
        const embed = new Discord.RichEmbed()
            /*
             * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
             */
            .setColor(0x00AE86)
            /*
            * Takes a Date object, defaults to current date.
            */
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            /*
            * Inline fields may not display as inline if the thumbnail and/or image is too big.
            */
            .addField("Name", target.name)
            .addField("Damage", target.damage)
            .addField("Type", target.type)
            .addField("Reach/Range", target.range)
            .addField("Cost", target.cost)
            .addField("Properties", target.properties)
            .addField("Special", target.special);

        message.channel.send({ embed });
    }
    function embedArmorMessage(target) {
        const embed = new Discord.RichEmbed()
            /*
             * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
             */
            .setColor(0x00AE86)
            /*
            * Takes a Date object, defaults to current date.
            */
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            /*
            * Inline fields may not display as inline if the thumbnail and/or image is too big.
            */
            .addField("Name", target.name)
            .addField("Base AC", target.baseac)
            .addField("Dex Pen", target.dexpen)
            .addField("DR", target.dr)
            .addField("Type", target.type)
            .addField("Max Dex", target.maxdex)
            .addField("Cost", target.cost);

        message.channel.send({ embed });
    }
}