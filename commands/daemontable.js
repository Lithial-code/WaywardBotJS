const Discord = require("discord.js");
exports.run = (client, message,args) => {
    var fs = require('fs');
    const json = JSON.parse(fs.readFileSync('./json/daemontable.json', 'utf8'));
    embedMessage();

    function embedMessage() {
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setFooter("© Lelantos Studios", client.user.avatarURL)
          .setTimestamp()
          .addField("Sacrifice: ", json[0].sacrifice, true)
          .addField("Result", json[0].result, true)
          .addField("DC", json[0].DC, true)
          .addField("Sacrifice: ", json[1].sacrifice, true)
          .addField("Result", json[1].result, true)
          .addField("DC", json[1].DC, true)
          .addField("Sacrifice: ", json[2].sacrifice, true)
          .addField("Result", json[2].result, true)
          .addField("DC", json[2].DC, true)
          .addField("Sacrifice: ", json[3].sacrifice, true)
          .addField("Result", json[3].result, true)
          .addField("DC", json[3].DC, true)
    
        message.channel.send({ embed }).catch(console.error);
      }
}