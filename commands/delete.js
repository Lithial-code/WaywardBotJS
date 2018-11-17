const Discord = require('discord.js')
const config = require("../config.json");

exports.run = (client, message, args) => {
    var GM_ROLE = "West Marches GM";
    var role2 = "Westmarches";
    const DMROLL = message.guild.roles.find(role => role.name === GM_ROLE);
   
    const member = message.member;
    if (member.roles.has(DMROLL.id)) {
        console.log(message.channel.name)
        var name = message.channel.name;
        var chan1 = message.guild.channels.find(channel => channel.name === name);
        var chan0 = message.guild.channels.find(channel => channel.name === `${name}_ooc`);
        var role = message.guild.roles.find(role => role.name.toLowerCase() === name.toLowerCase());
        chan1.delete().then(result => console.log(result)).catch((err)=> {
            console.log(err)
            message.reply("You probably did the command in the wrong channel");
        });
        chan0.delete().then(result => console.log(result)).catch((err)=> {
            console.log(err)
            message.reply("Not sure what you did to get this message but your probably deleting the next channel manually");
        });
        role.delete().then(result => console.log(result)).catch((err)=> {
            console.log(err)
            message.reply("The role probably doesnt exist or something? IDK?");
        });
    } else {
   
    }

}