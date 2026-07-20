const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const pkg = JSON.parse(require("fs").readFileSync("./package.json", "utf8"));

module.exports = {
	data: new SlashCommandBuilder()
		.setName("about")
		.setDescription("About this bot"),
	async execute(interaction) {
		await interaction.deferReply();
		try {
			const res = await fetch("https://neops.x10.mx/data/bot/about.txt");
			const about = await res.text();
			const embed = new EmbedBuilder()
				.setTitle("About this bot")
				.setDescription("```" + about + "```\n**Version**: " + pkg.version + " | **Made by**: [OmaxMorales](https://github.com/Omax64MXG4ming)");
			await interaction.editReply({ embeds: [embed] });
		} catch (err) {
			await interaction.editReply("Could not load about info.");
		}
	}
};
