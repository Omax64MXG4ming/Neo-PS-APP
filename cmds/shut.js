const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("shut")
		.setDescription("Shut down the bot (owner only)"),
	permission: "owner",
	async execute(interaction, client) {
		await interaction.reply("Good Bye 👋");
		client.destroy();
	}
};
