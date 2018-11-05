module.exports = (client, message) => {
    //ignore all bots
    if (message.author.bot) return;
    if (message.content == "\\") return;

    //ignore messages without prefix
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    //*TODO:
    ///put check for command here
    ///
    if (client.commands.get(command) != null) {
        
        //grab the comand data from the client.commands Enmap
        const cmd = client.commands.get(command);

        //run the command
        cmd.run(client, message, args);
    }
}