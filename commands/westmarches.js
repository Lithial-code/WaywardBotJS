const Discord = require('discord.js')
const config = require("../config.json");

exports.run = (client, message, args) => {

    const role = message.guild.roles.find(role => role.name === "West Marches");
    const member = message.member;
    
    //TODO make this tidier with a function
    if (member.user.username.toLowerCase().includes("utc")) {
        if (member.roles.has(role.id)) {
            member.removeRole(role);
            message.reply("West Marches Role Removed");
        } else {
            member.addRole(role);
            message.reply("West Marches Role Assigned");
        }
    }
    else if (member.nickname != null) {
        if (member.nickname.toLowerCase().includes("utc")) {
            if (member.roles.has(role.id)) {
                member.removeRole(role);
                message.reply("West Marches Role Removed");
            } else {
                member.addRole(role);
                message.reply("West Marches Role Assigned");
            }
        }
        else {
            message.reply("Please add a time zone to your nickname in UTC");
        }
    }
    else {
        message.reply("Please add a time zone to your nickname in UTC");
    }

}