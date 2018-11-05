const config = require("../config.json");
exports.run = (client, message,args) => {
    if(message.author.id !== config.ownerID) return;
    if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    const commandName = args[0];
    //Check if the command exists and is valid
    if(!client.commands.has(commandName)){
        return message.reply("That command does not exist");
    }
    //the path is relative to the current folder so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName,props);
    message.reply(`The command ${commandName} has been reloaded`);
}