const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("leaderboard")
		.setDescription("Check top players on the GDPS")
		.addStringOption(opt =>
			opt.setName("type")
				.setDescription("Leaderboard type")
				.setRequired(true)
				.addChoices(
					{ name: "Stars", value: "stars" },
					{ name: "Demon", value: "demon" },
					{ name: "Coins", value: "coins" },
					{ name: "Gold Coins", value: "gold.coins" },
					{ name: "Creator Points", value: "CP" }
				))
		.addIntegerOption(opt =>
			opt.setName("page").setDescription("Page number (default: 1)").setRequired(false)),
	async execute(interaction) {
		const type = interaction.options.getString("type");
		const page = interaction.options.getInteger("page");
		await interaction.deferReply();

		try {
			let url = M.host + "/bot/api/leaderboard.php?in=" + type;
			if (page) url += "&page=" + page;

			const res = await fetch(url);
			const body = await res.json();

			if (!body || !body.top) {
				return interaction.editReply("Leaderboard page not found for `" + type + "`.");
			}

			const embed = new EmbedBuilder()
				.setTitle("Leaderboard of " + body.type)
				.addFields(
					{ name: "Top " + body.topTo, value: body.top },
					{ name: "For Next Page", value: "`/leaderboard type:" + type + " page:<num>`" }
				)
				.setFooter({ text: "Now Page = " + body.page });

			await interaction.editReply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.editReply("An error occurred.");
		}
	}
};
