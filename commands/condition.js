const Discord = require("discord.js");
const fuzzysort = require('fuzzysort');


exports.run = (client, message, args) => {
  var fs = require('fs');
  const json = JSON.parse(fs.readFileSync('./json/conditions.json', 'utf8'));
  if (args[0] == '*') {
    embedList();
  }
  else {
    fuzzysearch();
  }


  function fuzzysearch() {
    var searchmessage = "";
    var counter = 1;
    var target = "";
    args.forEach(element => {
      target += element + " ";
    });
    //organise word to search and document to search
    var targettrim = target.trim(); //trim the white space off the end so .includes reads it properly

    //fuzzy search with options. still not 100% on what everything does but it works
    const results = fuzzysort.go(targettrim, json, {
      threshold: -Infinity, // Don't return matches worse than this (higher is faster)
      limit: Infinity, // Don't return more results than this (lower is faster)
      allowTypo: true, // Allwos a snigle transpoes (false is faster)
      key: 'name', // For when targets are objects (see its example usage)
      keys: null, // For when targets are objects (see its example usage)
      scoreFn: null, // For use with `keys` (see its example usage)
    });
    if(results.length <= 0) {
      errorwrong ();
    return;
  }
    //if perfect response
    if (results[0].obj.name.toLowerCase() == targettrim) {
      embedMessage(results[0].obj);
    }
    //if not perfect, make a list of possible responses. 
    //ask the user which one they want and serve that one back to them
    else {
      results.forEach(element => {
        searchmessage += counter + ":" + element.obj.name + '\n';
        counter++;
      })
      didyoumeanembed(searchmessage);
      //this is the ask the player thingy. 
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
      console.log(collector)
      collector.on('collect', message => {
        var id = parseInt(message) - 1;
        //error check
        if (id >= results.length) {
          errorwrongnumber();
        }
        else {
          embedMessage(results[id].obj);
          return;
        }
      });
    }

  }

  //#region  
  //
  //section for embed messages
  //
  function errorwrong() {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Error", "Not a valid request please try again")
    message.channel.send({ embed });
  }
  //error message for wrong number reply
  function errorwrongnumber() {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Error", "Not a valid response please try again")
    message.channel.send({ embed });
  }
  //called to ask did you mean one of these, produces a list
  function didyoumeanembed(searchmessage) {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Did you mean?: ", searchmessage + '\n' + "Reply with your choice");
    message.channel.send({ embed });
  }
  //called to display list of all actions
  function embedList() {
    //make list to display
    var list = "";
    json.forEach(element => {
      list += element.name + '\n';
    });
    //message to display
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("List: ", list)
    message.channel.send({ embed });
  }
  //Method for making condition embed
  function embedMessage(target) {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Name: ", target.name)
      .addField("Description", target.text);

    message.channel.send({ embed }).catch(console.error);
  }

}