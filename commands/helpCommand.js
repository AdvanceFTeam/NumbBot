const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Info for the available commands'),

  async execute(interaction) {
    const helpEmbed = {
      color: 0x7289DA,
      title: '🌟 NumbBot Help Center',
      description: 'Get the available commands and features of NumbBot.',
      fields: [
        { name: '🔍 Commands', value: 'Here are some commands you can use with NumbBot:' },
        { name: '', value: '' }, 
        { name: '/r34', value: 'Get random videos/images from Rule34 API\nExample: `/r34 tags=tag1,tag2,tag3 limit=5`' },
        { name: '/nekobot', value: 'Get Nsfw Images\nExample: `/nekobot `' },
        { name: '/waifunsfw', value: 'Get NSFW images\nExample: `/waifunsfw category=waifu`' },
        { name: '/waifusfw', value: 'Get SFW images\nExample: `/waifusfw category=waifu`' },
        { name: '/profilepic', value: 'Shows your profile picture\nExample: `/profilepic`' },
        { name: '/avatar', value: 'Shows your profile picture\nExample: `/avatar`' },
        { name: '\u200B', value: '\u200B' }, 
        { name: 'Powered By', value: 'Discord.js', inline: true },
        { name: 'Developed By', value: 'YellowGreg', inline: true },
        { name: 'Join Our Community', value: '[Join Here](https://discord.gg/VpvxjMMA8S)', inline: true },
      ],
      footer: { text: 'Made by: AdvanceFalling Team', iconURL: 'https://i.ibb.co/VL0Bgxd/2f478e-fb9a06a828dc477a9c6540bd9d38e5fe-mv2.png' },
    };

    await interaction.reply({ embeds: [helpEmbed] });
  },
};
