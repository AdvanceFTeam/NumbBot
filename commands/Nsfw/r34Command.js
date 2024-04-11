const axios = require('axios');

module.exports = {
  data: {
    name: 'r34',
    description: 'Search for Rule34 images.',
    type: 1,
    options: [
      {
        name: 'tags',
        description: 'Search tags',
        type: 3,
        required: true,
      },
      {
        name: 'limit',
        description: 'Number of results (up to 10)',
        type: 4,
        required: false,
      },
    ],
  },
  async execute(interaction) {
    // Check if the interaction is in an NSFW channel
    if (!interaction.channel.nsfw) {
      return await interaction.reply({ content: 'This command can only be used in NSFW channels.', ephemeral: true });
    }

    try {
      const options = interaction.options;
      const tagsOption = options.getString('tags');
      const tagsInput = tagsOption.trim().split(',');
      const encodedTags = tagsInput.map((tag) => encodeURIComponent(tag));
      const joinedTags = encodedTags.join('%20');

      let limit = options.getInteger('limit') || 5; // Default is 5 links for response
      limit = Math.max(1, Math.min(10, limit)); // Limit to a reasonable range for links(10)

      // Using deferReply instead of defer(idk why)
      await interaction.deferReply({ ephemeral: false });

      const response = await axios.get(
        `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${joinedTags}`
      );

      const data = response.data;

      if (data && data.length > 0) {
        const selectedPosts = [];
        for (let i = 0; i < limit; i++) {
          const randomIndex = Math.floor(Math.random() * data.length);
          selectedPosts.push(data[randomIndex]);
        }

        const links = selectedPosts.map((post, index) => `[${index + 1}] ${post.file_url}`);

        await interaction.followUp({
          content: `Search Tags:${tagsInput.map((tag) => `\`${tag}\``)}\n\n${links.join('\n')}`,
          ephemeral: false,
        });
      } else {
        await interaction.followUp('No results found for the provided tags.');
      }
    } catch (error) {
      console.error(error);
      await interaction.followUp('An error occurred while searching Rule34.');
    }
  },
};
