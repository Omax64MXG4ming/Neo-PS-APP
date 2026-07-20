const { EmbedBuilder } = require("discord.js");

module.exports.gdpsstatus = async (client, M) => {
	let channel; 
	try {
		channel = await client.channels.fetch(M["channel"]["gdpsstatus"]);
	} catch (e) {
		console.log("gdpsstatus: channel not found");
		return false;
	}

	if (!channel) return false;

	setInterval(async () => {
		try {
			let dbStatus = "OK <:yes:1519887320931762296>";
			let httpdStatus = "OK <:yes:1519887320931762296>";

			const res = await fetch(M["host"] + "/bot/status.php");
			const status = await res.text();

			if (!res.ok) {
				dbStatus = "ERROR <:no:1519887297930334218>";
				httpdStatus = "ERROR <:no:1519887297930334218>";
			} else if (status !== "1") {
				dbStatus = "ERROR <:no:1519887297930334218>";
			}

			const embed = new EmbedBuilder()
				.setTitle("Neo API Status")
				.setDescription(
					"**Database Status**: " + dbStatus + "\n" +
					"**Server Status**: " + httpdStatus + "\n" +
					"This will be refresh in 60 sec"
				);

			const latest = await channel.messages.fetch({ limit: 20 });
			const msg = latest.find(m => m.author.id === client.user.id && m.embeds.length > 0 && m.embeds[0].title === "GDPS Status");

			if (!msg) {
				embed.setFooter({ text: "times refreshed: 1" });
				await channel.send({ embeds: [embed] });
			} else {
				const time = msg.embeds[0].footer?.text?.split(": ") || ["times refreshed", "0"];
				embed.setFooter({ text: time[0] + ": " + (parseInt(time[1]) + 1) });
				await msg.edit({ embeds: [embed] });
			}
		} catch (err) {
			console.error("gdpsstatus error:", err.message);
		}
	}, 60000);
};
