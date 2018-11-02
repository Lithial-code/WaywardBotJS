const Discord = require("discord.js");
exports.run = (client, message, args) => {
    embedMessage();
    function embedMessage() {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("Support: ", "If you want to support the continued development of Wayward Adventurers you can support me on patreon here: https://www.patreon.com/wayward_adventurers")
        message.channel.send({ embed });
    }

}
