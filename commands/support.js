const Discord = require("discord.js");
exports.run = (client, message, args) => {
    message.reply(EmbedMessage());

    function EmbedMessage() {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("Support: ", "If you want to support the continued development of Wayward Adventurers you can support us on patreon here: https://www.patreon.com/wayward_adventurers")
			.addField("Also","We can maybe do bitcoin stuff if thats easier for you.");
       return embed;
    }
}
