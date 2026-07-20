const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("List all available commands"),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle("Help — All Commands")
			.setDescription("Here are all available slash commands:")
			.addFields(
				{ name: "/ping", value: "Check bot latency" },
				{ name: "/about", value: "About this bot" },
				{ name: "/users <query>", value: "Check a player's profile by name or account ID" },
				{ name: "/level <query>", value: "Check level info by ID or name" },
				{ name: "/levelby <page> <user>", value: "List levels by a player" },
				{ name: "/levelsearch <page> <query>", value: "Search levels on the GDPS" },
				{ name: "/leveltop <levelid> [page]", value: "Leaderboard for a specific level" },
				{ name: "/dailylevel", value: "Check today's daily level" },
				{ name: "/weeklylevel", value: "Check this week's weekly level" },
				{ name: "/leaderboard <type> [page]", value: "Top players — types: `stars`, `demon`, `coins`, `gold.coins`, `CP`" },
				{ name: "/song <id>", value: "Check song info by ID or name" },
				{ name: "/songadd <url>", value: "Add a SoundCloud song to the GDPS" },
				{ name: "/sendstatus", value: "Force-resend the GDPS status embed (owner only)" },
				{ name: "/reboot", value: "Reboot the bot (owner only)" },
				{ name: "/shut", value: "Shut down the bot (owner only)" }
			);
		await interaction.reply({ embeds: [embed] });
	}
};
