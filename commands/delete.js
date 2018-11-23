const Discord = require('discord.js')
const config = require("../config.json");

exports.run = (client, message, args) => {
    var GM_ROLE = "West Marches GM";
    const GMRole = message.guild.roles.find(role => role.name === GM_ROLE);
    const member = message.member;
    
    if (member.roles.has(GMRole.id)) {
        var name = message.channel.name;
        var chan_IC = message.guild.channels.find(channel => channel.name === name);
        var chan_OOC = message.guild.channels.find(channel => channel.name === `${name}_ooc`);
        var role = message.guild.roles.find(role => role.name.toLowerCase() === name.toLowerCase());

        chan_IC.delete('Expedition is finished. Deleting channels')
            .then(deleted => console.log(`Deleted ${deleted.name} because its time was done`))
            .catch(console.error);

        chan_OOC.delete('Expedition is finished. Deleting channels')
            .then(deleted => console.log(`Deleted ${deleted.name} because its time was done`))
            .catch(console.error);

        role.delete('The role needed to go')
            .then(deleted => console.log(`Deleted role ${deleted.name}`))
            .catch(console.error);
    } 
    else {
        message.reply("You don't have permission to do this");
    }

}