const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("leveltop")
		.setDescription("Leaderboard for a specific level")
		.addStringOption(opt =>
			opt.setName("levelid").setDescription("Level ID").setRequired(true))
		.addIntegerOption(opt =>
			opt.setName("page").setDescription("Page number (default: 1)").setRequired(false)),
	async execute(interaction) {
		const lvl = interaction.options.getString("levelid");
		const page = interaction.options.getInteger("page");
		await interaction.deferReply();

		try {
			let url = M.host + "/bot/api/leveltop.php?id=" + encodeURIComponent(lvl);
			if (page) url += "&page=" + page;

			const res = await fetch(url);
			const body = await res.json();

			if (body.msg) return interaction.editReply("Level not found.");
			if (!body.top) return interaction.editReply("No scores found for this level.");

			const embed = new EmbedBuilder()
				.setTitle(":bar_chart: Leaderboard from Level " + body.levelname)
				.addFields(
					{ name: "Top " + body.topTo, value: body.top },
					{ name: "More Commands", value: "`/leveltop levelid:" + lvl + " page:<num>`\n`/level query:" + lvl + "`" }
				)
				.setFooter({ text: "Now Page = " + body.page });

			await interaction.editReply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.editReply("An error occurred.");
		}
	}
};
