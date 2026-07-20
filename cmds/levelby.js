const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("levelby")
		.setDescription("List levels created by a player")
		.addStringOption(opt =>
			opt.setName("user").setDescription("Player name or account ID").setRequired(true))
		.addIntegerOption(opt =>
			opt.setName("page").setDescription("Page number (default: 1)").setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getString("user");
		const page = interaction.options.getInteger("page") || 1;
		await interaction.deferReply();

		try {
			const res = await fetch(M.host + "/bot/api/levelby.php?users=" + encodeURIComponent(user) + "&page=" + page);
			const body = await res.json();

			if (!body.levels) {
				return interaction.editReply("No levels found on page " + page + " for this player.");
			}

			const embed = new EmbedBuilder()
				.setTitle(body.users + "'s Levels")
				.setDescription(body.levels)
				.addFields({ name: "More Commands", value: `**Next page:** \`/levelby user:${user} page:${page + 1}\`\n**Check level:** \`/level <id>\`` });

			await interaction.editReply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.editReply("An error occurred.");
		}
	}
};
