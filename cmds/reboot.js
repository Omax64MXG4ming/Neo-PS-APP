const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reboot")
		.setDescription("Reboot the bot (owner only)"),
	permission: "owner",
	async execute(interaction, client) {
		await interaction.reply("See you again 😉 Rebooting...");
		client.destroy();
		setTimeout(() => client.login(process.env.BOT_TOKEN), 2000);
	}
};
