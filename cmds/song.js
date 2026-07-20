const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("song")
		.setDescription("Check song information by ID or name")
		.addStringOption(opt =>
			opt.setName("id").setDescription("Song ID or song name").setRequired(true)),
	async execute(interaction) {
		const id = interaction.options.getString("id");
		await interaction.deferReply();

		try {
			const res = await fetch(M.host + "/bot/api/song.php");
			const body = await res.json();

			const entry = body.find(p => p.id === id) || body.find(p => p.name === id);
			if (!entry) return interaction.editReply("This song does not exist.");

			const embed = new EmbedBuilder()
				.setTitle("Song Information")
				.setDescription(`ID Song: **${entry.id}**\nName: **${entry.name}**\nSize: **${entry.size}**\n${entry.download}`)
				.addFields({ name: "Stats", value: "This song is **" + entry.Info + "**" });

			await interaction.editReply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.editReply("An error occurred.");
		}
	}
};
