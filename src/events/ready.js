const fs = require("fs");
const { EmbedBuilder } = require('discord.js')
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    //register app commands
    let path = fs.readdirSync('./src/commands')
    let data = JSON.parse(fs.readFileSync('./src/commands/aliases/cmds.json'))
    for (key of path) {

      if (key.endsWith('.js') === false) {
        if (key === 'aliases') continue
        let newpath = fs.readdirSync(`./src/commands/${key}`)

        for (newkey of newpath) {
          if (newkey.endsWith('.js') === false) continue

          let name = newkey.split('').splice(0, newkey.length - 3).reduce((x, y) => x += y, '')
          if (data[name] === undefined) {
            data[name] = [name]
            fs.writeFileSync('./src/commands/aliases/cmds.json', JSON.stringify(data, null, 2))
          }
        }
      } else {
        let name = key.split('').splice(0, key.length - 3).reduce((x, y) => x += y, '')
        if (data[name] === undefined) {
          data[name] = [name]
          fs.writeFileSync('./src/commands/aliases/cmds.json', JSON.stringify(data, null, 2))
        }
      }
    }

    //set slash commands (I think)
    const commands = [...client.commands].map(x => x[1].data)
    await client.application.commands.set(commands)
    console.log('[!] Commands set globally');



    //load auto_start_commands
    const commandFiles = [];
    (findCommands = async (path = "ready_cmds") => {
      fs.readdirSync(`./src/${path}`).filter(async (file) => {
        if (file.endsWith(".js")) return commandFiles.push(file);
        findCommands(path + `/${file}`);
      });
    })();

    for (const file of commandFiles) {

      let commander;
      const getCommands = (name, path = "ready_cmds") => {
        const dirr = `./src/${path}`;

        fs.readdirSync(dirr).filter((find) => {
          if (find === name) {
            commander = `../${path}/${find}`;
          } else {
            if (find.endsWith("js") === true) return;
            return getCommands(name, path + `/${find}`);
          }
        });
      };
      getCommands(file);

      const command = require(commander);

      command.execute(client)

    }

  },
};
