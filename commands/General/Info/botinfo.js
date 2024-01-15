const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const path = require('path');
const pidusage = require('pidusage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Get information about the bot.'),

    async execute(interaction) {
        const cpuUsage = await pidusage(process.pid);

        const developers = [
            { id: '773952016036790272', name: 'yellowgreg' },
            { id: '804955810820128798', name: 'wspboy12' },
            { id: '804953768814313482', name: 'mmsvon' },
            { id: '935758592445939752', name: '.shadowclark' },
        ];

        const developerMentions = developers.map(dev => `<@${dev.id}>`).join(', ');

        // Count total commands
        const commandFiles = getCommandFiles('./commands');
        const totalCommands = commandFiles.length;

        const botInfoEmbedOptions = {
            color: 0x7289DA,
            title: '🌟 Bot Information',
            description: 'Get information about the bot.',
            thumbnail: { url: 'https://i.pinimg.com/564x/cd/73/46/cd73465cec4c838e144ba5b986da9bce.jpg' },
            fields: [
                { name: '🤖 Bot Name', value: interaction.client.user.username, inline: true },
                { name: '🆔 Bot ID', value: interaction.client.user.id, inline: true },
                { name: '📅 Created At', value: interaction.client.user.createdAt.toDateString(), inline: true },
                { name: '🌐 Total Server', value: interaction.client.guilds.cache.size, inline: true },
                { name: '👥 Users Count', value: interaction.client.users.cache.size, inline: true },
                { name: '🏓 WS Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
                { name: '⏰ Uptime', value: formatUptime(interaction.client.uptime), inline: true },
                { name: '💻 CPU Usage', value: `${cpuUsage.cpu.toFixed(2)}%`, inline: true },
                { name: '📚 Discord.js Version', value: require('discord.js').version, inline: true },
                { name: '📁 Total Commands', value: totalCommands.toString(), inline: true },
                { name: '👨‍💻 Developers', value: developerMentions, inline: true },
            ],
            footer: { text: 'Made by: AdvanceFalling Team', iconURL: 'https://i.ibb.co/VL0Bgxd/2f478e-fb9a06a828dc477a9c6540bd9d38e5fe-mv2.png' },
        };

        await interaction.reply({ embeds: [botInfoEmbedOptions] });
    },
};

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
}

function getCommandFiles(dir) {
    const commandFiles = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            commandFiles.push(...getCommandFiles(filePath));
        } else if (file.endsWith('.js')) {
            commandFiles.push(filePath);
        }
    }

    return commandFiles;
}