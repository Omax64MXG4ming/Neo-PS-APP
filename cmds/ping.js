const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Check the bot latency"),
	async execute(interaction) {
		const before = Date.now();
		await interaction.reply({ content: "Pinging..." });
		await interaction.editReply(`Pong! Latency is **${Date.now() - before}ms** | API: **${interaction.client.ws.ping}ms**`);
	}
};
