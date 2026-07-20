const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dailylevel")
		.setDescription("Check today's daily level"),
	async execute(interaction) {
		await interaction.deferReply();

		try {
			const res = await fetch(M.host + "/bot/api/dailylevel.php");
			const search = await res.json();

			if (search.UP === "1970-01-01") return interaction.editReply("Sorry, this level is not found.");
			if (!search.id) return interaction.editReply("There is nothing set as daily level.");

			const text = Buffer.from(search.desc, "base64").toString();
			const thumb = `http://famrygd.5v.pl/img/${search.diff}${search.dmn}${search.auto}${search.F}${search.E}${search.dmns}.png`;
			const stats = `${search.coins}\n${search.stars}\n${search.DL}\n${search.likes}\n${search.length}`;
			const info = `ID Level: **${search.id}**\nLevel: **${search.unlisted}**\nObject: **${search.objects}**\nPass: **${search.pass}**\nLevel Version: **${search.ver}**`;

			const songRes = await fetch(M.host + "/bot/api/song.php");
			const songs = await songRes.json();
			const N = Array.isArray(songs) ? songs.find(p => p.id === search.songId) : null;

			const embed = new EmbedBuilder()
				.addFields(
					{ name: search.name + " By " + search.creator, value: "Description:\n**" + text + "**" },
					{ name: "Stat of level:", value: stats }
				)
				.setThumbnail(thumb)
				.setFooter({ text: "Created at " + search.create + " | Updated at " + search.UP });

			if (!N) {
				embed.addFields(
					{ name: "Song Info", value: `**${search.creator}** just set the **Normal Song**` },
					{ name: "Information", value: info }
				);
			} else {
				embed.addFields(
					{ name: "Song Info", value: `ID: **${search.songId}**\nSong Name: **${N.name}**\nSize: **${N.size}**\n${N.download}` },
					{ name: "Information", value: info }
				);
			}

			await interaction.editReply({ content: "This level for today", embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.editReply("An error occurred while fetching the daily level.");
		}
	}
};
