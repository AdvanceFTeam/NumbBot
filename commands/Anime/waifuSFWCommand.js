const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("waifusfw")
    .setDescription("Pictures from waifu.pics")
    .addStringOption(option => option.setName("category").setDescription("SFW category")
      .addChoices( // limit is 25 so if its over 25 theres gonna be error
        { name: 'waifu', value: 'waifu' },
        { name: 'neko', value: 'neko' },
        //          { name: 'shinobu', value: 'shinobu' },
        //          { name: 'megumin', value: 'megumin' },
        { name: 'bully', value: 'bully' },
        { name: 'cuddle', value: 'cuddle' },
        { name: 'cry', value: 'cry' },
        { name: 'hug', value: 'hug' },
        { name: 'awoo', value: 'awoo' },
        { name: 'kiss', value: 'kiss' },
        { name: 'lick', value: 'lick' },
        { name: 'pat', value: 'pat' },
        { name: 'smug', value: 'smug' },
        { name: 'bonk', value: 'bonk' },
        { name: 'yeet', value: 'yeet' },
        { name: 'blush', value: 'blush' },
        { name: 'smile', value: 'smile' },
        { name: 'wave', value: 'wave' },
        //          { name: 'highfive', value: 'highfive' },
        { name: 'handhold', value: 'handhold' },
        { name: 'nom', value: 'nom' },
        { name: 'bite', value: 'bite' },
        { name: 'glomp', value: 'glomp' },
        { name: 'slap', value: 'slap' },
        //          { name: 'kill', value: 'kill' },
        //          { name: 'kick', value: 'kick' },
        { name: 'happy', value: 'happy' },
        { name: 'wink', value: 'wink' },
        //          { name: 'poke', value: 'poke' },
        { name: 'dance', value: 'dance' },
        { name: 'cringe', value: 'cringe' },
      )
      .setRequired(false))
    .addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more than one at a time.").setMinValue(1).setMaxValue(10)),
  async execute(interaction) {
    let amount = 1;
    const category = interaction.options.getString("category");
    if (interaction.options.getNumber("repeat")) { amount = Number(interaction.options.getNumber("repeat")) }
    for (let a = 0; a < amount; a++) {
      let response = await fetch(`https://api.waifu.pics/sfw/${category}`);
      let data = await response.text();
      const img = JSON.parse(data);
      const embed = new EmbedBuilder()
        .setImage(img.url)
        .setFooter({ text: `${category} - ${a + 1}/${amount}` })
        .setColor([160, 32, 240]);
      try { await interaction.followUp({ embeds: [embed] }) }
      catch { interaction.reply({ embeds: [embed] }) }
      await wait(1000);
    }
  }
};