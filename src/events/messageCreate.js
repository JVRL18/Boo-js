const fs = require("fs");

module.exports = {
  name: "messageCreate",
  async execute(message, client, typo) {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.toLowerCase().startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);

    //Register commands on load
    const checkCommandAlts = (info) => {
      let alts = JSON.parse(
        fs.readFileSync("./src/commands/aliases/cmds.json")
      );
      for (key in alts) {
        if (alts[key].indexOf(info) !== -1) {
          return key;
        }
      }
      return false;
    };
    const msg = args.shift().toLowerCase();

    const input1 = args[0];
    const commandName = await checkCommandAlts(msg);

    const command = client.commands.get(commandName);
    try {
      command.execute(message, client, input1, args, typo);
    } catch (err) {
      console.log(err);
    }
  },
};
