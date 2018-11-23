const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

client.config = config;


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    if (commandName == "roll") {
      client.commands.set("r", props);
    }
    if (commandName == "race") {
      client.commands.set("species", props);
    }
    if (commandName == "createchannel") {
      client.commands.set("cc", props);
    }
    if (commandName == "spell") {
      client.commands.set("magic", props);
      client.commands.set("invocation", props);
    }
    client.commands.set(commandName, props);

  });
});

client.login(config.token);