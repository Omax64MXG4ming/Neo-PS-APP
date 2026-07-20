const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("sendstatus")
		.setDescription("Force-resend the Neo API status embed (moderators only)"),
	permission: "moderator",
	async execute(interaction, client) {
		if (isNaN(M["channel"]["gdpsstatus"])) {
			return interaction.reply({ content: "<:no:1519887297930334218> No status channel configured.", flags: MessageFlags.Ephemeral });
		}

		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		try {
			const statusChannel = await client.channels.fetch(M["channel"]["gdpsstatus"]);

			const res = await fetch(M.host + "/bot/status.php");
			const status = await res.text();

			let dbStatus = "OK <:yes:1519887320931762296>";
			let httpdStatus = "OK <:yes:1519887320931762296>";
			if (!res.ok) {
				dbStatus = "ERROR <:no:1519887297930334218>";
				httpdStatus = "ERROR <:no:1519887297930334218>";
			} else if (status !== "1") {
				dbStatus = "ERROR <:no:1519887297930334218>";
			}

			const embed = new EmbedBuilder()
				.setTitle("GDPS Status")
				.setDescription(
					"**Database Status**: " + dbStatus + "\n" +
					"**Server Status**: " + httpdStatus + "\n" +
					"This will be refresh in 60 sec"
				)
				.setFooter({ text: "times refreshed: 1" });

			// Delete old status message if found
			const latest = await statusChannel.messages.fetch({ limit: 20 });
			const oldMsg = latest.find(m => m.author.id === client.user.id && m.embeds.length > 0 && m.embeds[0].title === "Neo PS API Status");
			if (oldMsg) await oldMsg.delete();

			await statusChannel.send({ embeds: [embed] });
			await interaction.editReply("<:yes:1519887320931762296> Status message resent.");
		} catch (err) {
			console.error(err);
			await interaction.editReply("<:no:1519887297930334218> Failed to resend status message.");
		}
	}
};
