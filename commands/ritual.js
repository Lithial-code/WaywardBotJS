const Discord = require("discord.js");
exports.run = (client, message, args) => {
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./json/rituals.json', 'utf8'));
    //
  //Make list of all the secret names
  //
  if (args[0] == '*') {
    embedList();
  }
  //else write the embed for the json object after pooling all the args into one name.
  else {
    var target = "";
    args.forEach(element => {
      target += element + " ";
    });
    var targettrim = target.trim(); //trim the white space off the end so .includes reads it properlyW
    var found = false;
    for (var i = 0; i < json.length; i++) {
      if (json[i].name.toLowerCase().includes(targettrim)) {
        found = true;
        embedMessage(json[i]);
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
    //method for making ritual embed
    //
    function embedMessage() {
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
    function embedMessage(target) {
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
            .addField("Name", target.name, true)
            /*
            * Blank field, useful to create some space.
            */
            .addField("Casting Time: ", target.castingtime, true)
            .addBlankField(true)
            .addField("Description", target.text, false);

        message.channel.send({ embed });
    }

}