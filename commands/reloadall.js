const config = require("../config.json");
exports.run = (client, message, args) => {
    if (message.author.id !== config.ownerID) return;
    ReloadAll();
    message.reply("Reloaded all modules");

    function ReloadAll() {
        var commandarray = client.commands.keyArray();
        commandarray.forEach(element => {
            var commandName = element.toString();
            if (commandName == "r") return;
            if (commandName == "magic") return;
            if (commandName == "invocation") return;
            if (commandName == "species") return;
            if (commandName == "cc") return;
            delete require.cache[require.resolve(`./${commandName}.js`)];
            const props = require(`./${commandName}.js`);
            client.commands.set(commandName, props);
        });
    }
}