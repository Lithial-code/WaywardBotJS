const Discord = require("discord.js");
exports.run = (client, message,args) => {
    embedMessage();

    function embedMessage() {
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setFooter("© Lelantos Studios", client.user.avatarURL)
          .setTimestamp()
          .addField("Link: ", "https://drive.google.com/file/d/1EqYg0iwVhtGK3aGEhYFJ2V-hlczIenY6/view?usp=sharing" );
    
        message.channel.send({ embed }).catch(console.error);
      }
}