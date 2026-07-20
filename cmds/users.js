const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("users")
		.setDescription("Check a player's profile")
		.addStringOption(opt =>
			opt.setName("query").setDescription("Player name or account ID").setRequired(true)),
	async execute(interaction) {
		const query = interaction.options.getString("query");
		await interaction.deferReply();

		try {
			const res = await fetch(M.host + "/bot/api/accounts.php?ID=" + encodeURIComponent(query));
			const acc = await res.json();

			if (acc.msg) return interaction.editReply("Sorry, player not found.");

			const embed = new EmbedBuilder()
				.setAuthor({ name: "Stats of " + acc.user })
				.setDescription(`${acc.stars}\n${acc.demon}\n${acc.S_Coins}\n${acc.CP}`)
				.addFields(
					{ name: "Social", value: acc.ytURL + "\n" + acc.twitter + "\n" + acc.twitch },
					{ name: "Ban Stats", value: "Leaderboard Ban: " + acc.Ban + "\nCP Ban: " + acc.cpBanned, inline: true },
					{ name: "Other Stats", value: "Admin Server: **" + acc.Admin + "**\nModerator: **" + acc.stat + "**" + acc.mod, inline: true }
				)
				.setFooter({ text: "AccountID: " + acc.id + " | Registered at: " + acc.register });

			await interaction.editReply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.editReply("An error occurred.");
		}
	}
};
