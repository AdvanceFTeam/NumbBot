require('dotenv').config();
const { Client, GatewayIntentBits, REST } = require('discord.js');
const { Routes } = require('discord-api-types/v10');

const r34Command = require('./commands/Nsfw/r34Command');
const waifuSFWCommand = require('./commands/Anime/waifuSFWCommand');
const waifuNSFWCommand = require('./commands/Nsfw/waifuNSFWCommand');
const helpCommand = require('./commands/helpCommand');
const avatarCommand = require('./commands/Fun/avatar');
const avatarsCommand = require('./commands/util/avatar');
const nekobotCommand = require('./commands/Nsfw/nekobot');
const botinfoCommand = require('./commands/General/Info/botinfo');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const commandName = interaction.commandName;
    const commands = {
      r34: r34Command,
      waifusfw: waifuSFWCommand,
      waifunsfw: waifuNSFWCommand,
      help: helpCommand,
      profilepic: avatarCommand,
      avatar: avatarsCommand,
      nekobot: nekobotCommand,
      botinfo: botinfoCommand,
    };

    if (commands[commandName]) {
      await commands[commandName].execute(interaction);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

// Register the slash commands
const commands = [
  r34Command.data,
  waifuSFWCommand.data,
  waifuNSFWCommand.data,
  helpCommand.data,
  avatarCommand.data,
  avatarsCommand.data,
  nekobotCommand.data,
  botinfoCommand.data,
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
