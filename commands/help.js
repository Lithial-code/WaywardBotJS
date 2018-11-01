const config = require("../config.json");
exports.run = (client, message,args) => {
    message.channel.send("Available commands are currently condition,ritual, spell and secret. The prefix is currently " + config.prefix).catch(console.error);
}