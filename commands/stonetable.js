const Discord = require("discord.js");
exports.run = (client, message,args) => {
    var fs = require('fs');
    const json = JSON.parse(fs.readFileSync('./json/stonetable.json', 'utf8'));
    embedMessage();

    function embedMessage() {
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setFooter("© Lelantos Studios", client.user.avatarURL)
          .setTimestamp()
          .addField("Spent: ", json[0].spent, true)
          .addField("Squares", json[0].squares, true)
          .addField("Duration", json[0].duration, true)
          .addField("Spent: ", json[1].spent, true)
          .addField("Squares", json[1].squares, true)
          .addField("Duration", json[1].duration, true)
          .addField("Spent: ", json[2].spent, true)
          .addField("Squares", json[2].squares, true)
          .addField("Duration", json[2].duration, true)
          .addField("Spent: ", json[3].spent, true)
          .addField("Squares", json[3].squares, true)
          .addField("Duration", json[3].duration, true)
    
        message.channel.send({ embed }).catch(console.error);
      }
}