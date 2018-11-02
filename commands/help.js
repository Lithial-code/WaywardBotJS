const Discord = require("discord.js");
const config = require("../config.json");
exports.run = (client, message,args) => {

    embedMessage();

    //Method for making condition embed
 function embedMessage(target) {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Available Commands: ", "credit, condition, feat, item, ritual, race, roll, spell, secret, support, trait.")
      .addField("Prefix", config.prefix);

    message.channel.send({ embed });
  }
}



